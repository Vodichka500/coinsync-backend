import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import axios from 'axios';
import {
  TCoinResponse,
  TFullCoinInfo,
  TMarketChart,
} from '@/common/types/coingeko';
import { Currency, CurrencyPairComparison } from '@prisma/client';
import { THistoricalRates } from '@/common/types/frankfurter';
import { fillMissingDatesWithLastRate } from '@/common/lib/fillMissingDays';
import selectFirstPricePerDay from '@/common/lib/selectFirstPricePerDay';

@Injectable()
export class ComparisonService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserComparisons(userId: number): Promise<CurrencyPairComparison[]> {
    try {
      return await this.prisma.currencyPairComparison.findMany({
        where: { userId: userId },
        include: {
          currencyA: true,
          currencyB: true,
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      console.error('Get user comparisons error:', error);
      throw new Error('Failed to retrieve user comparisons.');
    }
  }
  async getById(id: number): Promise<CurrencyPairComparison | null> {
    try {
      const comparisonWithDetails =
        await this.prisma.currencyPairComparison.findUnique({
          where: {
            id: id, // сюда подставьте нужный id сравнения
          },
          include: {
            currencyA: {
              include: {
                days: {
                  orderBy: { date: 'asc' },
                },
              },
            },
            currencyB: {
              include: {
                days: {
                  orderBy: { date: 'asc' },
                },
              },
            },
            user: true, // если нужно инфо о пользователе, создавшем сравнение
          },
        });

      if (!comparisonWithDetails) {
        throw new Error('Comparison not found');
      }
      return comparisonWithDetails;
    } catch (error) {
      console.error('Get comparison by ID error:', error);
      throw new Error('Failed to retrieve comparison data.');
    }
  }

  async deleteAllComparisons(): Promise<{ status: string; message: string }> {
    try {
      await this.prisma.currencyPairComparison.deleteMany({});
      console.log('All comparisons deleted successfully');
      return {
        status: 'success',
        message: 'All comparisons deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting all comparisons:', error);
      throw new Error('Failed to delete all comparisons.');
    }
  }

  async compare(
    userId: number,
    cryptoId: string,
    fiatSymbol: string,
    startDate: string,
    endDate: string,
  ): Promise<CurrencyPairComparison> {
    try {
      // GET CURRENCIES DATA FROM EXTERNAL APIs
      const [responseCrypto, responseFiat] = await Promise.all([
        this.fetchCryptoData(cryptoId, startDate, endDate),
        this.fetchFiatData(fiatSymbol, startDate, endDate),
      ]);

      if (!responseCrypto || !responseCrypto.prices) {
        throw new Error('Crypto or Fiat data not found');
      }
      const dbCrypto = await this.saveCryptoData(
        responseCrypto,
        startDate,
        endDate,
      );
      const dbFiat = await this.saveFiatData(responseFiat, startDate, endDate);

      // SAVE COMPARISON DATA TO DATABASE
      const comparison = await this.calculateAndSaveComparison(
        dbCrypto.id,
        dbFiat.id,
        startDate,
        endDate,
        userId,
      );

      return comparison;
    } catch (error) {
      console.error('Comparison error:', error);
      throw new Error('Failed to retrieve comparison data.');
    }
  }

  private async fetchCryptoData(
    cryptoId: string,
    startDate: string,
    endDate: string,
  ): Promise<TCoinResponse> {
    const { data: coinData } = await axios.get<TFullCoinInfo>(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}?community_data=false&developer_data=false&sparkline=false`,
      {},
    );

    const dateFrom = new Date(startDate).getTime() / 1000;
    const dateTo = new Date(endDate).getTime() / 1000;

    const { data: priceData } = await axios.get<TMarketChart>(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart/range?vs_currency=usd&from=${dateFrom}&to=${dateTo}`,
      {},
    );

    const result = { ...coinData, prices: priceData.prices } as TCoinResponse;
    return result;
  }

  private async saveCryptoData(
    coin: TCoinResponse,
    startDate: string,
    endDate: string,
  ): Promise<Currency> {
    const { name, symbol, prices } = coin;
    const parsedPrices = prices.map(([timestamp, value]) => ({
      date: new Date(timestamp),
      value,
    }));
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const dbCurrency: Currency = await this.prisma.currency.create({
      data: {
        name,
        symbol,
        type: 'CRYPTO',
        periodStart: parsedStartDate,
        periodEnd: parsedEndDate,
      },
    });

    const dbPrices = await this.prisma.currencyDay.createMany({
      data: parsedPrices.map(({ date, value }) => ({
        currencyId: dbCurrency.id,
        date,
        value,
      })),
    });

    if (!dbCurrency || !dbPrices) {
      throw new Error('Failed to save crypto data');
    }

    console.log(
      `Saved crypto data for ${name} (${symbol}) from ${startDate} to ${endDate}`,
    );
    return dbCurrency;
  }

  private async fetchFiatData(
    fiatName: string,
    startDate: string,
    endDate: string,
  ): Promise<THistoricalRates> {
    const dateOnlyStartdate = startDate.slice(0, 10);
    const dateOnlyEnddate = endDate.slice(0, 10);
    const fiatData = await axios.get<THistoricalRates>(
      `https://api.frankfurter.app/${dateOnlyStartdate}..${dateOnlyEnddate}`,
      {
        params: {
          from: fiatName,
          to: 'USD',
        },
      },
    );
    if (!fiatData || !fiatData.data) {
      throw new Error('Failed to fetch fiat data');
    }
    const result = fiatData.data;
    return fillMissingDatesWithLastRate(result, endDate);
  }

  private async saveFiatData(
    fiat: THistoricalRates,
    startDate: string,
    endDate: string,
  ): Promise<Currency> {
    const { base, rates } = fiat;
    const parsedPrices = Object.entries(rates).map(([stringDate, value]) => ({
      date: new Date(stringDate),
      value: value.USD,
    }));
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const dbCurrency: Currency = await this.prisma.currency.create({
      data: {
        name: base,
        symbol: base,
        type: 'FIAT',
        periodStart: parsedStartDate,
        periodEnd: parsedEndDate,
      },
    });

    const dbPrices = await this.prisma.currencyDay.createMany({
      data: parsedPrices.map(({ date, value }) => ({
        currencyId: dbCurrency.id,
        date,
        value,
      })),
    });

    if (!dbCurrency || !dbPrices) {
      throw new Error('Failed to save fiat data');
    }

    console.log(`Saved fiat data for ${base} from ${startDate} to ${endDate}`);
    return dbCurrency;
  }

  private async calculateAndSaveComparison(
    currencyAId: number,
    currencyBId: number,
    periodStart: string,
    periodEnd: string,
    userId: number,
  ): Promise<CurrencyPairComparison> {
    const [allDaysA, allDaysB] = await Promise.all([
      this.prisma.currencyDay.findMany({
        where: {
          currencyId: currencyAId,
        },
        orderBy: { date: 'asc' },
      }),
      this.prisma.currencyDay.findMany({
        where: {
          currencyId: currencyBId,
        },
        orderBy: { date: 'asc' },
      }),
    ]);

    if (allDaysA.length === 0 || allDaysB.length === 0) {
      throw new Error('No data available for comparison');
    }
    const daysA = selectFirstPricePerDay(allDaysA);
    const daysB = selectFirstPricePerDay(allDaysB);

    const priceBMap = new Map(
      daysB.map((day) => [day.date.toISOString().slice(0, 10), day.value]),
    );

    const ratios: number[] = [];
    for (const dayA of daysA) {
      const key = dayA.date.toISOString().slice(0, 10);
      const priceB = priceBMap.get(key);
      if (priceB !== undefined && priceB !== 0) {
        ratios.push(dayA.value / priceB);
      }
    }

    if (ratios.length === 0) {
      throw new Error('No valid ratios found for comparison');
    }

    const averageRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    const maxRatio = Math.max(...ratios);
    const minRatio = Math.min(...ratios);

    const variance =
      ratios.reduce((a, r) => a + (r - averageRatio) ** 2, 0) / ratios.length;
    const volatility = Math.sqrt(variance);

    const priceChangeA =
      (daysA[daysA.length - 1].value - daysA[0].value) / daysA[0].value;
    const priceChangeB =
      (daysB[daysB.length - 1].value - daysB[0].value) / daysB[0].value;

    let recommendation = 'Neutral';
    if (priceChangeA > 0.1 && priceChangeB < 0) {
      recommendation = 'Buy A, Sell B';
    } else if (priceChangeA < -0.1 && priceChangeB > 0) {
      recommendation = 'Sell A, Buy B';
    }

    return this.prisma.currencyPairComparison.create({
      data: {
        currencyA: { connect: { id: currencyAId } },
        currencyB: { connect: { id: currencyBId } },
        user: { connect: { id: userId } },
        periodStart,
        periodEnd,
        averageRatio,
        maxRatio,
        minRatio,
        volatility,
        priceChangeA,
        priceChangeB,
        recommendation,
      },
    });
  }
}

import { THistoricalRates } from '@/common/types/frankfurter';

export function fillMissingDatesWithLastRate(
  currency: THistoricalRates,
  desiredEndDate?: string,
): THistoricalRates {
  const filledRates: Record<string, Record<string, number>> = {};
  const start = new Date(currency.start_date);
  const end = desiredEndDate
    ? new Date(desiredEndDate)
    : new Date(currency.end_date);
  const currentDate = new Date(start);
  let lastKnownRate: number | null = null;

  while (currentDate <= end) {
    const dateStr = currentDate.toISOString().slice(0, 10);

    if (currency.rates[dateStr]) {
      const rate = currency.rates[dateStr]?.USD;
      if (rate !== undefined) {
        filledRates[dateStr] = { USD: rate };
        lastKnownRate = rate;
      }
    } else if (lastKnownRate !== null) {
      filledRates[dateStr] = { USD: lastKnownRate };
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    ...currency,
    end_date: desiredEndDate ?? currency.end_date,
    rates: filledRates,
  };
}

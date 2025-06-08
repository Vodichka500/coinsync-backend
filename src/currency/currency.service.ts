import { Injectable } from '@nestjs/common';

export interface Currency {
  id: string;
  name: string;
}

@Injectable()
export class CurrencyService {
  getFiatCurrencies(): Currency[] {
    return [
      { id: 'EUR', name: 'Euro' },
      { id: 'JPY', name: 'Japanese Yen' },
      { id: 'GBP', name: 'British Pound Sterling' },
      { id: 'AUD', name: 'Australian Dollar' },
      { id: 'CAD', name: 'Canadian Dollar' },
      { id: 'CHF', name: 'Swiss Franc' },
      { id: 'CNY', name: 'Chinese Yuan' },
      { id: 'HKD', name: 'Hong Kong Dollar' },
      { id: 'NZD', name: 'New Zealand Dollar' },
      { id: 'SEK', name: 'Swedish Krona' },
      { id: 'SGD', name: 'Singapore Dollar' },
      { id: 'NOK', name: 'Norwegian Krone' },
      { id: 'MXN', name: 'Mexican Peso' },
      { id: 'INR', name: 'Indian Rupee' },
      { id: 'RUB', name: 'Russian Ruble' },
      { id: 'ZAR', name: 'South African Rand' },
      { id: 'TRY', name: 'Turkish Lira' },
      { id: 'BRL', name: 'Brazilian Real' },
      { id: 'KRW', name: 'South Korean Won' },
      { id: 'AED', name: 'United Arab Emirates Dirham' },
    ];
  }

  getCryptoCurrencies(): Currency[] {
    return [
      { id: 'bitcoin', name: 'Bitcoin' },
      { id: 'ethereum', name: 'Ethereum' },
      { id: 'tether', name: 'Tether' },
      { id: 'binancecoin', name: 'BNB' },
      { id: 'usd-coin', name: 'USD Coin' },
      { id: 'solana', name: 'Solana' },
      { id: 'ripple', name: 'XRP' },
      { id: 'staked-ether', name: 'Lido Staked Ether' },
      { id: 'dogecoin', name: 'Dogecoin' },
      { id: 'tron', name: 'TRON' },
      { id: 'cardano', name: 'Cardano' },
      { id: 'wrapped-bitcoin', name: 'Wrapped Bitcoin' },
      { id: 'avalanche-2', name: 'Avalanche' },
      { id: 'toncoin', name: 'Toncoin' },
      { id: 'shiba-inu', name: 'Shiba Inu' },
      { id: 'polkadot', name: 'Polkadot' },
      { id: 'chainlink', name: 'Chainlink' },
      { id: 'matic-network', name: 'Polygon' },
      { id: 'litecoin', name: 'Litecoin' },
      { id: 'uniswap', name: 'Uniswap' },
    ];
  }
}

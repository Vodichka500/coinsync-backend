export interface TBaseCoinInfo {
  id: string;
  symbol: string;
  name: string;
}

export interface TFullCoinInfo extends TBaseCoinInfo {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
      eur: number;
    };
    market_cap: {
      usd: number;
      eur: number;
    };
    total_volume: {
      usd: number;
      eur: number;
    };
    high_24h: {
      usd: number;
      eur: number;
    };
    low_24h: {
      usd: number;
      eur: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
  };
}

export interface TMarketChart {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export type TCoinResponse = TFullCoinInfo & { prices: [number, number][] };

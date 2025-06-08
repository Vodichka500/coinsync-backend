export interface THistoricalRates {
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [date: string]: Record<string, number>;
    // "2023-06-01": { EUR: 0.92, GBP: 0.8 }
  };
}

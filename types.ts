
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRates {
  [key: string]: number;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

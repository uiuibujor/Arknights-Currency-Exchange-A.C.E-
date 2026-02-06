
import { ExchangeRates, GroundingSource } from "../types";

export class ExchangeService {
  async fetchLatestRates(): Promise<{ rates: ExchangeRates; sources: GroundingSource[] }> {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!response.ok) {
        throw new Error(`Exchange rate API request failed: ${response.status} ${response.statusText}`);
      }

      const data = (await response.json()) as {
        result?: string;
        rates?: Record<string, number>;
      };

      if (data.result !== "success" || !data.rates) {
        throw new Error("Exchange rate API response invalid");
      }

      const rates: ExchangeRates = { ...data.rates, USD: 1 };

      return {
        rates,
        sources: []
      };
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      // Fallback rates if API fails or network is down
      return {
        rates: {
          USD: 1,
          CNY: 7.15,
          JPY: 151.2,
          EUR: 0.92,
          GBP: 0.79,
          HKD: 7.82,
          TWD: 31.5,
          KRW: 1335,
          SGD: 1.34,
          AUD: 1.52,
          CAD: 1.35,
          THB: 35.8,
          PHP: 56.1,
          MYR: 4.74
        },
        sources: []
      };
    }
  }
}

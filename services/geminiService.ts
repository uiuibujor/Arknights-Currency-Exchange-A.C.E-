
import { GoogleGenAI } from "@google/genai";
import { ExchangeRates, GroundingSource } from "../types";

export class ExchangeService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async fetchLatestRates(): Promise<{ rates: ExchangeRates; sources: GroundingSource[] }> {
    try {
      // Use Gemini with Google Search to get actual current rates
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Provide the current mid-market exchange rates relative to 1 USD for the following currencies: CNY, JPY, EUR, GBP, HKD, TWD, KRW, SGD, AUD, CAD, THB, PHP, MYR. Format as JSON: {\"rates\": {\"CODE\": VALUE}, \"update_time\": \"...\"}",
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        },
      });

      let data;
      try {
        data = JSON.parse(response.text || '{}');
      } catch (e) {
        // Fallback if the model returns text instead of clean JSON despite config
        const jsonMatch = response.text.match(/\{[\s\S]*\}/);
        data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
      }

      // Ensure USD is 1
      if (data.rates) {
        data.rates['USD'] = 1;
      }

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      return {
        rates: data.rates || {},
        sources: sources as GroundingSource[]
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

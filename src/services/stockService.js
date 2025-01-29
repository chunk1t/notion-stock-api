const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

class StockService {
  async getPrice(symbol) {
    try {
      const response = await axios.get(config.alphaVantage.baseUrl, {
        params: {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: config.alphaVantage.apiKey
        }
      });

      const price = response.data['Global Quote']['05. price'];
      if (!price) {
        throw new Error(`No price data found for stock ${symbol}`);
      }

      return price;
    } catch (error) {
      logger.error(`Failed to fetch stock price for ${symbol}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new StockService();
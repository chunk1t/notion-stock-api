const axios = require('axios');
const config = require('../config');
const logger = require('../utils/logger');

class CryptoService {
  async getPrice(symbol) {
    try {
      const response = await axios.get(`${config.coinGecko.baseUrl}/simple/price`, {
        params: {
          ids: symbol.toLowerCase(),
          vs_currencies: 'usd'
        }
      });

      const price = response.data[symbol.toLowerCase()].usd;
      if (!price) {
        throw new Error(`No price data found for crypto ${symbol}`);
      }

      return price;
    } catch (error) {
      logger.error(`Failed to fetch crypto price for ${symbol}: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new CryptoService();
const axios = require('axios');
const logger = require('../utils/logger');

class MalaysiaStockService {
    async getPrice(symbol) {
        try {
            // Add .KL suffix for Malaysian stocks if not present
            const stockSymbol = symbol.endsWith('.KL') ? symbol : `${symbol}.KL`;

            const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}`, {
                params: {
                    interval: '1d',
                    range: '1d'
                }
            });

            if (!response.data.chart.result[0]?.meta?.regularMarketPrice) {
                throw new Error(`No price data found for Malaysian stock ${symbol}`);
            }

            return response.data.chart.result[0].meta.regularMarketPrice;
        } catch (error) {
            logger.error(`Failed to fetch Malaysian stock price for ${symbol}: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new MalaysiaStockService();
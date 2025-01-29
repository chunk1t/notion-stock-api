require('dotenv').config();

module.exports = {
  notion: {
    apiKey: process.env.NOTION_API_KEY,
    databaseId: process.env.NOTION_DATABASE_ID
  },
  alphaVantage: {
    apiKey: process.env.ALPHA_VANTAGE_API_KEY,
    baseUrl: 'https://www.alphavantage.co/query'
  },
  coinGecko: {
    baseUrl: 'https://api.coingecko.com/api/v3'
  },
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL
  }
};
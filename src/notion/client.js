const { Client } = require('@notionhq/client');
const config = require('../config');
const logger = require('../utils/logger');

class NotionClient {
  constructor() {
    this.client = new Client({ auth: config.notion.apiKey });
  }

  async updatePrice(pageId, price, assetType) {
    try {
      await this.client.pages.update({
        page_id: pageId,
        properties: {
          'Current Price': {
            number: parseFloat(price)
          },
          'Last Updated': {
            date: {
              start: new Date().toISOString()
            }
          }
        }
      });
      logger.info(`Updated ${assetType} price for page ${pageId}`);
    } catch (error) {
      logger.error(`Failed to update Notion page ${pageId}: ${error.message}`);
      throw error;
    }
  }

  async getAssets() {
    try {
      const response = await this.client.databases.query({
        database_id: config.notion.databaseId
      });

      return response.results.map(page => ({
        id: page.id,
        symbol: page.properties.Symbol?.rich_text[0]?.plain_text,
        assetType: page.properties['Asset Type'].select.name
      }));
    } catch (error) {
      logger.error(`Failed to fetch assets from Notion: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new NotionClient();
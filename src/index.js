const notionClient = require('./notion/client');
const stockService = require('./services/stockService');
const cryptoService = require('./services/cryptoService');
const logger = require('./utils/logger');
const notifier = require('./utils/notifier');

async function updatePrices() {
  try {
    const assets = await notionClient.getAssets();

    for (const asset of assets) {
      try {
        const price = await (asset.assetType === 'Stock'
          ? stockService.getPrice(asset.symbol)
          : cryptoService.getPrice(asset.symbol));

        await notionClient.updatePrice(asset.id, price, asset.assetType);
      } catch (error) {
        await notifier.sendNotification(
          `Failed to update ${asset.assetType} ${asset.symbol}: ${error.message}`,
          'error'
        );
      }
    }
  } catch (error) {
    logger.error(`Price update failed: ${error.message}`);
    await notifier.sendNotification(
      `Price update job failed: ${error.message}`,
      'error'
    );
  }
}

if (require.main === module) {
  updatePrices();
}

module.exports = { updatePrices };
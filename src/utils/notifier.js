const axios = require('axios');
const config = require('../config');
const logger = require('./logger');

class Notifier {
  async sendNotification(message, level = 'info') {
    if (!config.discord.webhookUrl) return;

    try {
      await axios.post(config.discord.webhookUrl, {
        content: `[${level.toUpperCase()}] ${message}`
      });
    } catch (error) {
      logger.error(`Failed to send notification: ${error.message}`);
    }
  }
}

module.exports = new Notifier();
# Notion Stock & Crypto Price Tracker

Automatically update stock, cryptocurrency, and Malaysian stock prices in your Notion database using GitHub Actions. This application fetches prices from Alpha Vantage (US stocks), Yahoo Finance (Malaysian stocks), and CoinGecko (cryptocurrencies) APIs and updates your Notion database daily.

## Features

- 🤖 Automated daily price updates at 7 AM
- 📈 Support for US stocks, Malaysian stocks, and cryptocurrencies
- 📊 Integration with Notion database
- 📝 Detailed logging
- ⚠️ Error notifications via Discord
- ✨ Easy setup and deployment

## Prerequisites

- Node.js 16 or higher
- A Notion account and database
- GitHub account (for automated updates)
- Alpha Vantage API key (free tier available, for US stocks only)
- Discord webhook URL (optional, for notifications)

## Notion Database Setup

1. Create a new database in Notion with the following properties:
   - Symbol (Text)
   - Asset Type (Select: Stock/MalaysiaStock/Crypto)
   - Current Price (Number)
   - Last Updated (Last edited time)

2. Share your database with your integration:
   - Go to your database page
   - Click `...` in the top right corner
   - Click `Add connections`
   - Search and select your integration

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/notion-price-tracker.git
cd notion-price-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env
```

4. Fill in your `.env` file:
```
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key  # Only needed for US stocks
DISCORD_WEBHOOK_URL=your_discord_webhook_url  # Optional
```

## Adding Stocks to Track

### Malaysian Stocks (KLSE)
Add Malaysian stocks to your Notion database with:
- Asset Type: `MalaysiaStock`
- Symbol: Either format works
  - With suffix: `1155.KL`
  - Without suffix: `1155` (The .KL suffix will be added automatically)

Popular Malaysian Stocks Examples:
```
1155.KL - Maybank
5285.KL - Sime Darby
6012.KL - Maxis
1023.KL - CIMB
5347.KL - Tenaga
```

### US Stocks
Add US stocks with:
- Asset Type: `Stock`
- Symbol: Standard NYSE/NASDAQ symbols (e.g., AAPL, MSFT, GOOGL)

### Cryptocurrencies
Add cryptocurrencies with:
- Asset Type: `Crypto`
- Symbol: Use CoinGecko IDs (e.g., bitcoin, ethereum, solana)

## Local Testing

Test the entire application:
```bash
node src/index.js
```

Test specific Malaysian stocks:
```javascript
const malaysiaStockService = require('./src/services/malaysiaStockService');

async function testStock() {
    try {
        const price = await malaysiaStockService.getPrice('1155');  // Maybank
        console.log('Maybank stock price:', price);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
testStock();
```

## GitHub Actions Setup

1. Go to your GitHub repository settings
2. Navigate to `Secrets and variables` -> `Actions`
3. Add the following repository secrets:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `ALPHA_VANTAGE_API_KEY` (only needed for US stocks)
   - `DISCORD_WEBHOOK_URL` (optional)

The GitHub Action will automatically run once daily at 7 AM UTC.

## Customization

### Changing Update Time

To change when the script runs, modify the cron schedule in `.github/workflows/price-updates.yml`:

```yaml
on:
  schedule:
    # Format: minute hour day month day-of-week
    - cron: '0 7 * * *'  # Runs at 7 AM UTC
```

## Troubleshooting

1. **Price updates not running:**
   - Check GitHub Actions tab for error logs
   - Verify all secrets are set correctly
   - Ensure GitHub Actions is enabled for the repository

2. **Malaysian Stock errors:**
   - Verify the stock symbol is correct
   - Check if the stock is actively traded
   - Ensure the .KL suffix is either present or absent (not partial)

3. **API errors:**
   - For US stocks: Verify Alpha Vantage API key
   - For Malaysian stocks: Yahoo Finance might be experiencing high traffic
   - For crypto: Check CoinGecko rate limits

4. **Notion updates failing:**
   - Confirm database structure matches requirements
   - Verify Notion API key and database ID
   - Check if integration has database access

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Sample Screenshot of the results
<img width="1121" alt="image" src="https://github.com/user-attachments/assets/ed98c2e5-c0b3-4b41-b494-109dbbc55a9c" />



## License

This project is licensed under the MIT License - see the LICENSE file for details.

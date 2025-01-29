# Notion Stock & Crypto Price Tracker

Automatically update stock and cryptocurrency prices in your Notion database using GitHub Actions. This application fetches prices from Alpha Vantage (stocks) and CoinGecko (cryptocurrencies) APIs and updates your Notion database daily.

## Features

- 🤖 Automated daily price updates at 7 AM MYT
- 📈 Support for both stocks and cryptocurrencies
- 📊 Integration with Notion database
- 📝 Detailed logging
- ⚠️ Error notifications via Discord
- ✨ Easy setup and deployment

## Prerequisites

- Node.js 16 or higher
- A Notion account and database
- GitHub account (for automated updates)
- Alpha Vantage API key (free tier available)
- Discord webhook URL (optional, for notifications)

## Notion Database Setup

1. Create a new database in Notion with the following properties:
   - Symbol (Text)
   - Asset Type (Select: Stock/Crypto)
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
ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key
DISCORD_WEBHOOK_URL=your_discord_webhook_url  # Optional
```

## Local Testing

Run the price update script locally:
```bash
node src/index.js
```

## GitHub Actions Setup

1. Go to your GitHub repository settings
2. Navigate to `Secrets and variables` -> `Actions`
3. Add the following repository secrets:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - `ALPHA_VANTAGE_API_KEY`
   - `DISCORD_WEBHOOK_URL` (optional)

The GitHub Action will automatically run once daily at 7 AM MYT.

## Customization

### Changing Update Time

To change when the script runs, modify the cron schedule in `.github/workflows/price-updates.yml`:

```yaml
on:
  schedule:
    # Format: minute hour day month day-of-week
    - cron: '0 7 * * *'  # Runs at 7 AM UTC
```

### Adding More Assets

Add new assets directly in your Notion database:
1. Add a new row
2. Set the Symbol (e.g., AAPL for Apple stock, bitcoin for Bitcoin)
3. Select the Asset Type (Stock or Crypto)

## Troubleshooting

1. **Price updates not running:**
   - Check GitHub Actions tab for error logs
   - Verify all secrets are set correctly
   - Ensure GitHub Actions is enabled for the repository

2. **API errors:**
   - Verify API keys are valid
   - Check API rate limits
   - Review error logs in GitHub Actions

3. **Notion updates failing:**
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
<img width="1106" alt="image" src="https://github.com/user-attachments/assets/3230ed18-b574-4a25-add1-cbd043c7e65b" />


## License

This project is licensed under the MIT License - see the LICENSE file for details.

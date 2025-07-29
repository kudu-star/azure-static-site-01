# Azure Static Web App with Visitor Counter

A simple visitor counter implementation using Azure Static Web Apps and Azure Functions with Table Storage.

## Features

- Azure Static Web App hosting
- Serverless visitor counter using Azure Functions
- Persistent storage using Azure Table Storage
- TypeScript implementation
- Built-in error handling and logging
- Real-time visitor count display

## Prerequisites

- Node.js 18.x or later
- Azure Functions Core Tools v4
- Visual Studio Code with Azure extensions:
  - Azure Account
  - Azure Static Web Apps
  - Azure Functions
- Azure account with active subscription
- Git for version control

## Project Structure

```
azure-static-site/
├── api/
│   ├── visitorCounter/     # Function folder
│   │   ├── function.json   # Function configuration
│   │   └── index.ts       # Function implementation
│   ├── local.settings.json # Local development settings
│   ├── package.json       # Node.js dependencies
│   └── tsconfig.json      # TypeScript configuration
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── index.html            # Static website
└── README.md            # This file
```

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd azure-static-site
```

2. Install dependencies:
```bash
cd api
npm install
```

3. Install Azure Functions Core Tools:
```powershell
npm install -g azure-functions-core-tools@4
```

4. Configure local settings:
Create `api/local.settings.json`:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "YOUR_STORAGE_CONNECTION_STRING",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
  }
}
```

## Local Development

1. Build and start the Function:
```bash
cd api
npm run build
npm start
```

2. Test the visitor counter:
- Function endpoint: `http://localhost:7071/api/visitorCounter`
- Open `index.html` in a browser to see the counter in action

## Deployment

1. Create a GitHub repository and push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Deploy to Azure Static Web Apps:
- Open Command Palette (F1)
- Select "Azure Static Web Apps: Create Static Web App"
- Configure deployment settings:
  - App location: "/"
  - API location: "api"
  - Output location: "/"

3. Configure Azure Settings:
- In Azure Portal, find your Static Web App
- Go to Configuration
- Add `AzureWebJobsStorage` with your storage connection string

## Monitoring

- View Function logs in Azure Portal
- Monitor visitor counts in Table Storage
- Check GitHub Actions for deployment status

## API Reference

### GET /api/visitorCounter

Returns the current visitor count.

**Success Response:**
```json
{
    "count": number
}
```

**Error Response:**
```json
{
    "status": 500,
    "body": "error message"
}
```

## Troubleshooting

- Check Function logs for API issues
- Verify storage connection string is correctly configured
- Ensure all dependencies are installed
- Confirm GitHub Actions workflow is running successfully

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT](LICENSE)
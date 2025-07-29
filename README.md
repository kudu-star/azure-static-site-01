# Azure Static Web App with Visitor Counter

A simple visitor counter implementation using Azure Static Web Apps and Azure Functions with Table Storage.

## Features

- Azure Static Web App hosting
- Serverless visitor counter using Azure Functions
- Persistent storage using Azure Table Storage
- TypeScript implementation
- Built-in error handling and logging

## Prerequisites

- Node.js 18.x or later
- Azure CLI
- Visual Studio Code with Azure extensions
- Azure account with active subscription

## Project Structure

```
azure-static-site/
├── api/
│   ├── function.json        # Azure Function configuration
│   ├── index.ts            # Function implementation
│   ├── local.settings.json # Local development settings
│   ├── package.json        # Node.js dependencies
│   └── tsconfig.json       # TypeScript configuration
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

3. Configure local settings:
   - Copy `local.settings.json.example` to `local.settings.json`
   - Add your Azure Storage connection string

## Local Development

1. Start the Azure Functions runtime:
```bash
npm start
```

2. Test the visitor counter endpoint:
```bash
curl http://localhost:7071/api/visitorCounter
```

## Deployment

1. Deploy to Azure using VS Code:
   - Open Command Palette (F1)
   - Select "Azure Static Web Apps: Create Static Web App"
   - Follow the prompts to deploy

2. Configure storage connection string in Azure:
   - Navigate to your Static Web App in Azure Portal
   - Go to Configuration
   - Add `AzureWebJobsStorage` setting with your storage connection string

## API Reference

### GET /api/visitorCounter

Returns the current visitor count.

**Response:**
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[MIT](LICENSE)
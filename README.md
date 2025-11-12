# A small demo for testing the Gynger checkout widget

## Prerequisites

- Node.js (v16 or higher)
- npm

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
GYNGER_API_KEY=your_api_key_here
GYNGER_PUBLIC_KEY=your_public_key_here
GYNGER_API_URL=https://staging.api.gynger.io  # or http://localhost:8085 for local API

# Local Widget Configuration (optional)
IS_LOCAL=true  # Set to true to use local widget bundle
LOCAL_WIDGET_PATH=../gynger-checkout-widget/dist  # Custom path to local widget (optional)

# Database Configuration (optional)
DB_NAME=local.db  # SQLite database filename
```

**Environment Variables:**

- `GYNGER_API_KEY`: Your Gynger API key for server-side operations (test/sandbox/prod)
- `GYNGER_PUBLIC_KEY`: Your Gynger public key for frontend widget initialization
- `GYNGER_API_URL`: Gynger API endpoint URL
- `IS_LOCAL`: Set to `true` to use local widget bundle instead of remote
- `LOCAL_WIDGET_PATH`: Custom path to your local gynger-checkout-widget (defaults to `../gynger-checkout-widget/dist`)
- `DB_NAME`: SQLite database filename (defaults to `local.db`)

### 3. Local Widget Development (Optional)

If you want to test with a local checkout widget bundle:

1. Set `IS_LOCAL=true` in your `.env` file
2. Ensure the widget is built in the configured path (default: `../gynger-checkout-widget/dist`)
3. The server will automatically serve the local bundle at `/local-widget/gynger-checkout.bundle.js`

When `IS_LOCAL=false` or not set, the app uses the remote widget from Google Cloud Storage.

### 4. Database

The app uses SQLite for local development. The database file is automatically created on first run and is excluded from git. To reset your database, simply delete the database file (default: `local.db`) and restart the server.

## Running the App

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3003` (or the port specified in your environment).

## Deploying to Google Cloud Run

### Prerequisites

1. A Google Cloud Platform project with Cloud Run API enabled
2. An Artifact Registry repository for Docker images
3. A service account with the following roles:
   - Cloud Run Admin
   - Service Account User
   - Artifact Registry Writer

### Setup GitHub Secrets and Variables

Configure the following in your GitHub repository (Settings > Secrets and variables > Actions):

**Secrets:**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `GOOGLE_PROJECT` | Your GCP project ID | `my-project-123` |
| `GOOGLE_JSON_KEY` | Service account JSON key | Full JSON content of your service account key file |
| `GYNGER_API_KEY` | Gynger API key for production | `sk_prod_xxx` or `sk_test_xxx` |
| `GYNGER_PUBLIC_KEY` | Gynger public key for frontend | `pk_prod_xxx` or `pk_test_xxx` |
| `GYNGER_API_URL` | Gynger API endpoint | `https://api.gynger.io` or `https://staging.api.gynger.io` |

**Variables:**

| Variable Name | Description | Example |
|---------------|-------------|---------|
| `SERVICE_REGION` | GCP region for deployment | `us-central1` |

### Artifact Registry Setup

Before deploying, create an Artifact Registry repository:

```bash
gcloud artifacts repositories create partner-checkout-demo \
    --repository-format=docker \
    --location=us-central1 \
    --description="Docker repository for partner checkout demo"
```

### Deployment

The app automatically deploys to Cloud Run when you push to the `main` branch. The GitHub Actions workflow:

1. Checks out the code
2. Authenticates with Google Cloud
3. Builds a Docker image
4. Pushes the image to Artifact Registry
5. Deploys to Cloud Run with the configured environment variables

### Manual Deployment

To deploy manually using `gcloud`:

```bash
# Build and push Docker image
gcloud builds submit --tag us-central1-docker.pkg.dev/PROJECT_ID/partner-checkout-demo/partner-checkout-demo

# Deploy to Cloud Run
gcloud run deploy partner-checkout-demo \
  --image us-central1-docker.pkg.dev/PROJECT_ID/partner-checkout-demo/partner-checkout-demo \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production,GYNGER_API_URL=YOUR_API_URL,GYNGER_API_KEY=YOUR_API_KEY"
```

### Configuration

The workflow is configured in `.github/workflows/deploy-cloud-run.yml`. You can customize:

- `SERVICE_NAME`: The Cloud Run service name (default: `partner-checkout-demo`)
- `REGION`: GCP region for deployment (default: `us-central1`)
- Resource allocation: Memory (512Mi) and CPU (1)
- Auto-scaling: Min instances (0) and max instances (10)

#### Licence

This code is released as is, under MIT licence. Feel free to use it for free for both commercial and private projects. No warranty provided.

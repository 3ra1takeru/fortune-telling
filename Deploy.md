# Deployment Guide

## 1. Google Cloud Platform (BigQuery) Setup

1.  **Create a Google Cloud Project** if you haven't already.
2.  **Enable BigQuery API**.
3.  **Run the Setup Script**:
    Edit `scripts/setup_gcp_bigquery.ps1` and set your `$ProjectId`.
    Then run:
    ```powershell
    ./scripts/setup_gcp_bigquery.ps1
    ```
4.  **Create a Service Account**:
    *   Go to IAM & Admin > Service Accounts.
    *   Create a new account (e.g., `fortune-app-worker`).
    *   Grant roles: `BigQuery Data Editor`, `BigQuery Job User`.
    *   Create a Key (JSON) and download it.
    *   **IMPORTANT**: Base64 encode this JSON file for use in Cloudflare Secrets.
        ```powershell
        [Convert]::ToBase64String([IO.File]::ReadAllBytes("path/to/key.json"))
        ```

## 2. Cloudflare Workers (Backend)

1.  Navigate to `backend/`.
2.  Edit `wrangler.toml` to put your `GOOGLE_PROJECT_ID`.
3.  Set the Service Account Secret:
    ```bash
    npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_JSON
    # Paste the raw JSON (or Base64 if your code handles it, current code expects raw JSON string)
    ```
4.  Deploy:
    ```bash
    npx wrangler deploy
    ```

## 3. Cloudflare Pages (Frontend)

1.  Navigate to `frontend/`.
2.  Build the project:
    ```bash
    npm run build
    ```
3.  Deploy using Wrangler (Pages):
    ```bash
    npx wrangler pages deploy dist --project-name=ultimate-fortune-app
    ```

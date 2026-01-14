# PowerShell Script to Setup BigQuery Environment
# Prerequisites: Google Cloud SDK (gcloud CLI) installed and authenticated.

$ProjectId = "fortune-telling-484316"
$DatasetId = "fortune_telling_db"
$SchemaFile = "../schema/bigquery_schema.sql"
$Location = "US" # or "asia-northeast1"

Write-Host "Setting up BigQuery Environment for: $ProjectId"

# Check if bq command exists
if (-not (Get-Command "bq" -ErrorAction SilentlyContinue)) {
    Write-Error "Google Cloud SDK ('bq' command) not found. Please install/authenticate gcloud CLI."
    exit 1
}

# 1. Create Dataset
Write-Host "Creating Dataset: $DatasetId..."
bq --project_id=$ProjectId mk --dataset --location=$Location --description "Ultimate Fortune Telling DB" $DatasetId
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Dataset creation might have failed or already exists."
}

# 2. Apply Schema (Tables)
# Since 'bq query' usually takes standard SQL, we can feed the schema file content.
# Note: The schema file contains multiple CREATE statements. 'bq query' might need them one by one or as a script.
# We will read the file and execute it.

Write-Host "Applying Schema from $SchemaFile..."
$SqlContent = Get-Content $SchemaFile -Raw

# Replace placeholder if needed or just run (The schema uses hardcoded dataset name `fortune_telling_db`)
# We execute the DDL script
bq query --project_id=$ProjectId --use_legacy_sql=false $SqlContent

if ($LASTEXITCODE -eq 0) {
    Write-Host "Schema applied successfully!" -ForegroundColor Green
}
else {
    Write-Error "Failed to apply schema."
}

Write-Host "Setup Complete. Please ensure Service Account has 'BigQuery Data Editor' and 'BigQuery Job User' roles."

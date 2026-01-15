# PowerShell Script to Load Calendar Data into BigQuery
$ProjectId = "fortune-telling-484316"
$DatasetId = "fortune_telling_db"
$TableId = "master_calendar"
$CsvFile = "master_calendar.csv"

# Add bq to PATH if missing
if (-not (Get-Command "bq" -ErrorAction SilentlyContinue)) {
    $SdkPath = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin"
    if (Test-Path $SdkPath) {
        $env:PATH = "$SdkPath;$env:PATH"
    }
}

Write-Host "Loading $CsvFile into $DatasetId.$TableId..."

# Load data (Replace table if exists)
# Schema: date_key:DATE,year:INTEGER,month:INTEGER,day:INTEGER,western_sun_sign:STRING,western_moon_sign:STRING,ganshi_day_id:INTEGER,nine_star_year:INTEGER,moon_phase:FLOAT
bq load --project_id=$ProjectId --source_format=CSV --skip_leading_rows=1 --replace "${DatasetId}.${TableId}" $CsvFile "date_key:DATE,year:INTEGER,month:INTEGER,day:INTEGER,western_sun_sign:STRING,western_moon_sign:STRING,ganshi_day_id:INTEGER,nine_star_year:INTEGER,moon_phase:FLOAT"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Data loaded successfully!" -ForegroundColor Green
}
else {
    Write-Error "Failed to load data."
    exit 1
}

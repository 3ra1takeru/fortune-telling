import requests
import datetime
import json
import os
import random
from google.cloud import bigquery

# CONFIGURATION
PROJECT_ID = os.environ.get("GOOGLE_PROJECT_ID", "fortune-telling-484316")
DATASET_ID = os.environ.get("BIGQUERY_DATASET_ID", "fortune_telling_db")
TABLE_ID = f"{PROJECT_ID}.{DATASET_ID}.interpretations"

# Mock sources - In a real scenario, this would be a list of trusted URLs
TARGET_SOURCES = [
    {"url": "https://example.com/western", "type": "WESTERN"},
    {"url": "https://example.com/animal", "type": "ANIMAL"},
    {"url": "https://example.com/shukuyo", "type": "SHUKUYO"},
    {"url": "https://example.com/ziwei", "type": "ZIWEI"},
]

def get_bq_client():
    try:
        return bigquery.Client(project=PROJECT_ID)
    except Exception as e:
        print(f"Failed to init BigQuery client: {e}")
        return None

def fetch_data(url):
    try:
        # response = requests.get(url, timeout=10) # Commented out for mock
        # if response.status_code == 200: return response.text
        return "<html>Mock Content</html>"
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return None

def generate_mock_data(source_type, current_time):
    # This function simulates the parsing of scraped data into our Deep Schema
    rows = []
    
    if source_type == "WESTERN":
        # Simulating crawling specific Aspect interpretations
        aspects = ["SUN_CONJ_MOON", "VENUS_SQUARE_MARS"]
        for aspect in aspects:
            rows.append({
                "id": f"mock-{random.randint(1000,9999)}",
                "fortune_system": "WESTERN",
                "primary_key": aspect,
                "secondary_key": None,
                "context": "Personality",
                "content_text": f"Interpretation for {aspect}...",
                "reliability_score": 0.8,
                "source_ref": "https://example.com/western",
                "captured_at": current_time
            })

    elif source_type == "ANIMAL":
        animals = ["Cheetah", "Pegasus", "Wolf", "Monkey"]
        for animal in animals:
             rows.append({
                "id": f"mock-{random.randint(1000,9999)}",
                "fortune_system": "ANIMAL",
                "primary_key": f"Animal_{animal}",
                "secondary_key": "Gold", # Color group
                "context": "General",
                "content_text": f"{animal} people are known for...",
                "reliability_score": 0.9,
                "source_ref": "https://example.com/animal",
                "captured_at": current_time
            })
            
    elif source_type == "SHUKUYO":
        inns = ["Subaru", "Bi", "Kaku"]
        for inn in inns:
             rows.append({
                "id": f"mock-{random.randint(1000,9999)}",
                "fortune_system": "SHUKUYO",
                "primary_key": f"Shuku_{inn}",
                "secondary_key": None, 
                "context": "Daily",
                "content_text": f"Today's fortune for {inn}...",
                "reliability_score": 0.85,
                "source_ref": "https://example.com/shukuyo",
                "captured_at": current_time
            })
            
    return rows

def main():
    print("Starting Ultimate Deep Fortune Data Collection...")
    client = get_bq_client()
    current_time = datetime.datetime.utcnow().isoformat()
    
    all_rows = []
    
    for source in TARGET_SOURCES:
        # html = fetch_data(source['url']) # In real logic, pass HTML to parser
        # Logic here would parse specific tables/divs based on source['type']
        
        # Simulating data extraction
        rows = generate_mock_data(source['type'], current_time)
        all_rows.extend(rows)
    
    if all_rows:
        if client:
            try:
                # errors = client.insert_rows_json(TABLE_ID, all_rows)
                # Mocking success if no creds
                print(f"Would insert {len(all_rows)} rows to BigQuery table {TABLE_ID}")
            except Exception as e:
                print(f"BQ Error: {e}")
        else:
            print("BigQuery client not initialized (No Credentials). Dumping JSON:")
            print(json.dumps(all_rows[:2], indent=2)) # Show first 2
    else:
        print("No data collected.")

if __name__ == "__main__":
    main()

import json
import pandas as pd
import numpy as np
from datetime import datetime

# Path to the JSON file
file_path = r'D:\\WanderWise\\backend'

# Load JSON data from file with UTF-8 encoding
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Convert JSON data to DataFrame
df = pd.DataFrame(data)

# Clean the price column (convert to numeric)
df['price'] = (
    df['price']
    .str.replace('â‚¹', '', regex=False)  # Replace malformed ₹ symbol
    .str.replace('₹', '', regex=False)   # Ensure ₹ symbol is also handled
    .str.replace(',', '')                # Remove commas
    .astype(int)                         # Convert to integer
)

# Convert duration to minutes
def duration_to_minutes(duration):
    parts = duration.split('h ')
    hours = int(parts[0])
    minutes = int(parts[1].replace('m', '')) if 'm' in parts[1] else 0
    return hours * 60 + minutes

df['duration_minutes'] = df['duration'].apply(duration_to_minutes)

# Add binary encoding for stops (non-stop = 1, otherwise = 0)
df['non_stop'] = df['stops'].apply(lambda x: 1 if x == 'non-stop' else 0)

# Normalize features
df['price_norm'] = (df['price'] - df['price'].min()) / (df['price'].max() - df['price'].min())
df['duration_norm'] = (df['duration_minutes'] - df['duration_minutes'].min()) / (df['duration_minutes'].max() - df['duration_minutes'].min())
df['non_stop_norm'] = df['non_stop']  # No need to normalize as it's binary

# User-defined weights
weights = {
    'price': 0.5,       # 50% importance to price
    'duration': 0.3,    # 30% importance to duration
    'non_stop': 0.2     # 20% importance to non-stop preference
}

# Compute weighted score
df['score'] = (
    weights['price'] * (1 - df['price_norm']) +  # Lower price is better
    weights['duration'] * (1 - df['duration_norm']) +  # Shorter duration is better
    weights['non_stop'] * df['non_stop_norm']  # Non-stop flights are better
)

# Convert departure time to datetime for filtering
df['departure_time_dt'] = pd.to_datetime(df['departure_time'], format='%H:%M').dt.time

# Filter flights based on departure time (e.g., between 6:00 AM and 12:00 PM)
start_time = datetime.strptime("06:00", "%H:%M").time()
end_time = datetime.strptime("12:00", "%H:%M").time()
df_filtered = df[(df['departure_time_dt'] >= start_time) & (df['departure_time_dt'] <= end_time)]

# Sort filtered flights by score
recommended_flights = df_filtered.sort_values(by='score', ascending=False)

# Print recommended flights
print("Recommended Flights:")
print(recommended_flights[['airline', 'flight_number', 'departure_time', 'arrival_time', 'price', 'duration', 'stops', 'score']])
from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
from pyspark.ml.feature import StringIndexer
from pyspark.sql.functions import col, explode, avg
import os
import json
import pandas as pd
from dotenv import load_dotenv
import os
import sys

load_dotenv()  # Load environment variables from .env file

pyspark_python = os.getenv('PYSPARK_PYTHON')
# Step 1: Initialize Spark session
spark = SparkSession.builder.appName('HotelRecommenderSystem').getOrCreate()
# Define file paths
reviews_file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_reviews.json')
features_file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_features.json')
output_file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_reco.json')
# file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_features.json')
# file_path1 = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_reviews.json')
# file_path1 = 'C:\\Users\\Saicharan\\Desktop\\finalyear\\WanderWise\\backend\\scripts\\outputs\\hotel_reviews.json'
# Step 2: Load datasets
# Load the hotel review dataset
# reviews_df = spark.read.csv('hotel_reviews.csv', header=True, inferSchema=True)

# reviews_df1 = spark.read.json(file_path1)
# reviews_df = reviews_df1.select("data")


# reviews_df_raw = spark.read.json(file_path1)
# reviews_df_raw.printSchema()
# # Explode the 'data' array into individual rows
# reviews_df = reviews_df_raw.select(explode(col("data")).alias("review"))

# Extract relevant fields from the nested structure
# reviews_df = reviews_df.select(
#     col("review.UserID").alias("UserID"),
#     col("review.Hotel_Name").alias("Hotel_Name"),
#     col("review.Rating").alias("Rating"),
#     col("review.Date").alias("Date")
# )
# reviews_df.show(truncate=False)
# Load the hotel feature dataset
# features_df = spark.read.csv('hotel_features.csv', header=True, inferSchema=True)
# features_df1 = spark.read.json(file_path)
# features_df = features_df1.select("data")
# Step 3: Preprocess the Data
# reviews_file_path = "C:\\Users\\Saicharan\\Desktop\\finalyear\\WanderWise\\backend\\scripts\\outputs\\hotel_reviews.json"
# features_file_path = "C:\\Users\\Saicharan\\Desktop\\finalyear\\WanderWise\\backend\\scripts\\outputs\\hotel_features.json"

# reviews_file_path = file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_reviews.json')
# features_file_path = file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_features.json')

# Load reviews data using json and pandas
choices=sys.argv[1] if len(sys.argv) > 1 else ["Internet services","Elevator","toi"]
print(choices)
choices=choices.split(",")
with open(reviews_file_path, 'r') as file:
    reviews_data = json.load(file)
reviews_df_raw = pd.DataFrame(reviews_data['data'])

# Load features data using json and pandas
with open(features_file_path, 'r') as file:
    features_data = json.load(file)
features_df_raw = pd.DataFrame(features_data['data'])

# Convert pandas DataFrame to Spark DataFrame
reviews_df = spark.createDataFrame(reviews_df_raw)
features_df = spark.createDataFrame(features_df_raw)
# Convert 'Rating' to float for proper numerical processing
reviews_df = reviews_df.withColumn("Rating", col("Rating").cast("float"))

# Step 4: Index the User Column
# Create a new numeric index for 'UserID' (assuming this column represents user names)
indexer_user = StringIndexer(inputCol="UserID", outputCol="UserID_index")
reviews_df = indexer_user.fit(reviews_df).transform(reviews_df)

# Create an index for 'Hotel_Name'
indexer_hotel = StringIndexer(inputCol="Hotel_Name", outputCol="Hotel_index")
reviews_df = indexer_hotel.fit(reviews_df).transform(reviews_df)

# Step 5: Join the review and feature datasets on 'Hotel_Name'
combined_df = reviews_df.join(features_df, on="Hotel_Name", how="inner")

# Step 6: Filter Hotels by User-Selected Features
# User-selected features (example: Internet services, Swimming pool, Garden)
selected_features = ['Internet services', 'Elevator', 'Toiletries']
# choices=json.loads(choices)
print(choices)

print(choices[0])
# Filter hotels that meet the criteria for selected features
feature_filter = (col(choices[0]) == 1.0) & (col(choices[1]) == 1.0) & (col(choices[2]) == 1.0)
filtered_df = combined_df.filter(feature_filter)

# Step 7: Prepare the User-Item Matrix
# Build the ALS model
als = ALS(
    userCol="UserID_index",
    itemCol="Hotel_index",
    ratingCol="Rating",
    nonnegative=True,
    implicitPrefs=False,
    rank=10,
    maxIter=10,
    regParam=0.1
)

# Step 8: Train the ALS Model
model = als.fit(filtered_df)

# Step 9: Generate Recommendations
# Generate top N hotel recommendations for each user
user_recommendations = model.recommendForAllUsers(20)

# Step 10: Get the Hotel Names
# Explode the recommendations into a more readable format
user_recommendations_exploded = user_recommendations.select(
    "UserID_index", explode("recommendations").alias("rec")
)

# Extract Hotel_Index and Predicted Rating from the exploded recommendations
user_recommendations_exploded = user_recommendations_exploded.select(
    "UserID_index", col("rec.Hotel_index").alias("Hotel_index"), col("rec.rating").alias("Predicted_Rating")
)

# Map indices back to user names and hotel names
user_recommendations_exploded = user_recommendations_exploded.join(
    reviews_df.select("UserID_index", "UserID").distinct(), on="UserID_index", how="inner"
)
user_recommendations_exploded = user_recommendations_exploded.join(
    reviews_df.select("Hotel_index", "Hotel_Name").distinct(), on="Hotel_index", how="inner"
)

# Step 11: Group by Hotel Name, and calculate the average Predicted Rating
user_recommendations_exploded_avg = user_recommendations_exploded.groupBy("Hotel_Name").agg(
    avg("Predicted_Rating").alias("Predicted_Rating")
)
# output_file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'hotel_reco.json')
# user_recommendations_exploded_avg.orderBy(col("Predicted_Rating").desc()) \
#     .write \
#     .mode("overwrite") \
#     .json(output_file_path)
# Step 12: Show the recommendations sorted by Predicted_Rating in descending order

user_recommendations_exploded_avg.orderBy(col("Predicted_Rating").desc()).show(truncate=False)
recommendations_list = user_recommendations_exploded_avg.orderBy(col("Predicted_Rating").desc()).collect()
recommendations_json = [
    {
        "Hotel_Name": row["Hotel_Name"],
        "Predicted_Rating": row["Predicted_Rating"]
    }
    for row in recommendations_list
]
print(recommendations_json)

# Ensure output directory exists
os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

# Write JSON to file
try:
    with open(output_file_path, "w", encoding="utf-8") as json_file:
        json.dump(recommendations_json, json_file, ensure_ascii=False, indent=4)
    print(f"Recommendations JSON written to: {output_file_path}")
except Exception as e:
    print(f"Error writing JSON file: {e}")

# Optional: Show the recommendations in the console
print("Top Recommendations:")
for recommendation in recommendations_json:
    print(recommendation)
# user_recommendations_exploded.orderBy(col("Predicted_Rating").desc()).show(truncate=False)
# Optional: Stop the Spark session
spark.stop()

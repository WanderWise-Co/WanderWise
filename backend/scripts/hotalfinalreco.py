from pyspark.sql import SparkSession
from pyspark.ml.recommendation import ALS
from pyspark.ml.feature import StringIndexer
from pyspark.sql.functions import col, explode, avg

# Step 1: Initialize Spark session
spark = SparkSession.builder.appName('HotelRecommenderSystem').getOrCreate()

# Step 2: Load datasets
# Load the hotel review dataset
reviews_df = spark.read.json('hotel_reviews.json', header=True, inferSchema=True)

# Load the hotel feature dataset
features_df = spark.read.json('hotel_features.json', header=True, inferSchema=True)
features_df = features_df['data']
reviews_df = reviews_df['data']
# Step 3: Preprocess the Data
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
selected_features = ['Internet services', 'Swimming pool [indoor]', 'Garden']

# Filter hotels that meet the criteria for selected features
feature_filter = (col("Internet services") == 1.0) & (col("Swimming pool [indoor]") == 1.0) & (col("Garden") == 1.0)
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
user_recommendations = model.recommendForAllUsers(5)

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

# Step 12: Show the recommendations sorted by Predicted_Rating in descending order
user_recommendations_exploded_avg.orderBy(col("Predicted_Rating").desc()).show(truncate=False)

# Optional: Stop the Spark session
spark.stop()

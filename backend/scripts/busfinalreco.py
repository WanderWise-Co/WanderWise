import json
import pandas as pd
from pyspark.ml.recommendation import ALS
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lit, when
from pyspark.sql.types import IntegerType, FloatType
import re
import os
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

pyspark_python = os.getenv('PYSPARK_PYTHON')
def load_bus_data(json_file):
    """
    Load bus data from a JSON file and preprocess it.
    """
    with open(json_file, 'r') as file:
        data = json.load(file)
    bus_dat=data['bus_data']
    df = pd.DataFrame(bus_dat)
    
    # Clean Rating: Extract numeric value from string like '4.6\n/5'
    df['Rating'] = df['Rating'].apply(lambda x: float(re.sub(r'[^\d.]', '', x)) if isinstance(x, str) else 0)
    
    # Clean Price: Remove '₹' and ',' and convert to float
    df['Price'] = df['Price'].replace('₹', '', regex=True).replace(',', '', regex=True).astype(float)
    
    # Clean Window Seats: Extract the number of window seats (e.g., '24 window seats')
    df['Window Seats'] = df['Window Seats'].apply(lambda x: int(re.search(r'\d+', x).group()) if isinstance(x, str) else 0)
    
    # Clean Total Seats Left: You can either extract information or drop it if it's non-numeric
    # For simplicity, we're setting this to 0 if it's non-numeric.
    # df['Total Seats Left'] = df['Total Seats Left'].apply(lambda x: 0 if not isinstance(x, (int, float)) else 0)

    df['Amenities Count'] = df['Amenities'].apply(len)
    
    # Assign bus IDs for ALS
    df['Bus ID'] = df.index + 1  # Create a unique ID for each bus
    return df

def create_spark_df(df):
    """
    Convert pandas DataFrame to Spark DataFrame.
    """
    # spark = SparkSession.builder.appName("BusRecommendationSystem").getOrCreate()
    spark = SparkSession.builder \
    .appName("BusRecommendationSystem") \
    .config("spark.driver.memory", "4g") \
    .config("spark.executor.memory", "4g") \
    .config("spark.network.timeout", "600s") \
    .getOrCreate()
    spark_df = spark.createDataFrame(df)
    return spark, spark_df

def prepare_data_for_als(spark_df):
    """
    Prepare data for ALS by creating a user-bus interaction matrix.
    """
    # Simulate a single user who rates buses based on weighted features
    user_data = spark_df.withColumn('User ID', lit(1))  # Add a dummy user ID
    
    # Compute interaction score (weighted sum of features)
    user_data = user_data.withColumn(
        'Interaction Score',
        (col('Rating') * 0.4) + 
        ((1 / (col('Price') + 1)) * 0.3) + 
        (col('Window Seats') * 0.1) + 
        # (col('Total Seats Left') * 0.1) + 
        (col('Amenities Count') * 0.1)
    )
    
    return user_data.select('User ID', 'Bus ID', 'Interaction Score')

def train_als_model(interaction_data):
    """
    Train an ALS model using interaction data.
    """
    als = ALS(
        maxIter=10,
        regParam=0.1,
        userCol="User ID",
        itemCol="Bus ID",
        ratingCol="Interaction Score",
        coldStartStrategy="drop"
    )
    model = als.fit(interaction_data)
    return model

def recommend_top_buses(model, spark_df, user_id=1, top_n=5):
    """
    Recommend top buses for the given user.
    """
    user_recommendations = model.recommendForAllUsers(top_n)
    user_recommendations = user_recommendations.filter(col("User ID") == user_id)
    
    # Extract and join with bus details
    recommendations = user_recommendations.collect()[0]['recommendations']
    recommended_bus_ids = [rec['Bus ID'] for rec in recommendations]
    
    top_buses = spark_df.filter(col('Bus ID').isin(recommended_bus_ids)).toPandas()
    return top_buses

def save_recommendations(top_buses, output_file='top_buses.json'):
    """
    Save recommended buses to a JSON file.
    """
    # top_buses.to_json(output_file, orient='records', indent=4)
    print(f"Top recommended buses saved to {top_buses}.")

# Main function
def recommend_buses_with_als(json_file, output_file='top_buses.json'):
    """
    Main function to recommend buses using ALS.
    """
    # Load and preprocess data
    df = load_bus_data(json_file)
    spark, spark_df = create_spark_df(df)
    
    # Prepare data for ALS
    interaction_data = prepare_data_for_als(spark_df)
    
    # Train ALS model
    model = train_als_model(interaction_data)
    
    # Get top recommendations
    top_buses = recommend_top_buses(model, spark_df, user_id=1, top_n=5)
    
    # Save recommendations
    save_recommendations(top_buses, output_file)

# Example usage
file_path = os.path.join(os.path.dirname(__file__), 'outputs', 'bus_data.json')
recommend_buses_with_als(file_path)

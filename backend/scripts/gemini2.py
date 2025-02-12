import os
import google.generativeai as genai
import sys
import json
from datetime import datetime

# Directly configure the API with your key
api = os.getenv('GEMENI_API_KEY')
genai.configure(api_key=api)

    
# Function to format the user preferences into a structured prompt
def generate_travel_plan(user_preferences, start_date, end_date, budget):
    # Build the request structure with the preferences, dates, and budget
    preference_details = json.dumps(user_preferences)  # Convert preferences to JSON format for clarity
    
    # Generate the travel plan prompt
    prompt = f"""
    I want to travel  {fromm} to {to} between {start_date} to {end_date} trip with a budget of {budget} INR. 
    The user has provided the following preferences:

    Preferences: {preference_details}

    Please create a detailed travel plan based on the given preferences, including hotel, travel, restaurant, and 
    attractions recommendations, keeping the budget in mind. and also hide all personal information.
    """
    return prompt



# Example of dates and budget
# start_date = "2024-12-05"
# end_date = "2024-12-08"
budget = 20000  # 20 thousand INR
today = datetime.today()
start_date = sys.argv[1] if len(sys.argv) > 1 else today
end_date = sys.argv[2] if len(sys.argv) > 2 else today
fromm  = sys.argv[3] if len(sys.argv) > 3 else "bengaluru"
to = sys.argv[4] if len(sys.argv) > 4 else "Mumbai"
# Example user preferences from the backend (Mocked data for demonstration)
user_preferences =sys.argv[5] if len(sys.argv) > 5 else  {
    "category": "hotel",
    "location": ["Hotel A", "Hotel B", "Hotel C"]
}, {
    "category": "restaurant",
    "location": ["Restaurant X", "Restaurant Y"]
}, {
    "category": "attraction",
    "location": ["Attraction 1", "Attraction 2"]
}, {
    "category": "travel",
    "location": ["Train", "Cab"]
}
print("incoming:",start_date,end_date,fromm,to,user_preferences)
# Generate the travel plan prompt
prompt = generate_travel_plan(user_preferences, start_date, end_date, budget)

# Configuration for generation
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

chat_session = model.start_chat(history=[])

# Send the prompt to Gemini and get the response
response = chat_session.send_message(prompt)

# Save the response text in JSON format
output_data = {
    "travel_plan": response.text
}
current_dir = os.path.dirname(os.path.realpath(__file__))
output_file = os.path.join(current_dir,  'outputs', 'gemini2.json')
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(output_data, file, ensure_ascii=False, indent=4)

print(f"Travel plan saved to {output_file}")

# import os
# import google.generativeai as genai
# import sys
# import datetime
# from dotenv import load_dotenv

# load_dotenv()
# api=os.getenv('GEMENI_API_KEY')
# # Directly configure the API with your key
# genai.configure(api_key=api)
# today = datetime.datetime.today()
# srcplace = sys.argv[1] if len(sys.argv) > 1 else "banglore"
# destplace = sys.argv[2] if len(sys.argv)>2 else "mumbai"
# check_in_date = sys.argv[3] if len(sys.argv) > 3 else today.strftime("%B")
# check_out_date = sys.argv[4] if len(sys.argv) > 4 else today.strftime("%B")
# # Rest of your code remains the same...
# generation_config = {
#   "temperature": 1,
#   "top_p": 0.95,
#   "top_k": 40,
#   "max_output_tokens": 8192,
#   "response_mime_type": "text/plain",
# }

# model = genai.GenerativeModel(
#   model_name="gemini-1.5-flash",
#   generation_config=generation_config,
# )

# chat_session = model.start_chat(history=[])

# response = chat_session.send_message("i want to travel to mysore for 3 days with 20 thousand give me a nice plan")
# sys.stdout.reconfigure(encoding='utf-8')
# print(response.text)
import os
import google.generativeai as genai
import sys
import datetime
from dotenv import load_dotenv

load_dotenv()
api = os.getenv('GEMENI_API_KEY')
# Directly configure the API with your key
genai.configure(api_key=api)

# Get today's date
today = datetime.datetime.today()

# Input variables
srcplace = sys.argv[1] if len(sys.argv) > 1 else "bangalore"
destplace = sys.argv[2] if len(sys.argv) > 2 else "mumbai"
check_in_date = sys.argv[3] if len(sys.argv) > 3 else today.strftime("%B %d, %Y")
check_out_date = sys.argv[4] if len(sys.argv) > 4 else (today + datetime.timedelta(days=3)).strftime("%B %d, %Y")

# Generation configuration
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

# Start a chat session
chat_session = model.start_chat(history=[])

# Construct the query
query = (
    f"I want to travel from {srcplace} to {destplace} starting on {check_in_date} "
    f"and returning on {check_out_date}. Please give me a detailed plan for the trip."
)

# Send the query to the AI model
response = chat_session.send_message(query)

# Ensure output encoding is UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Print the response
print(response.text)

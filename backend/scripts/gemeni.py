import os
import google.generativeai as genai
import sys
from dotenv import load_dotenv

load_dotenv()
api=os.getenv('GEMENI_API_KEY')
# Directly configure the API with your key
genai.configure(api_key=api)

# Rest of your code remains the same...
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

response = chat_session.send_message("i want to travel to mysore for 3 days with 20 thousand give me a nice plan")
sys.stdout.reconfigure(encoding='utf-8')
print(response.text)
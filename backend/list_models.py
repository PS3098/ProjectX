import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# List available models
try:
    models = genai.list_models()
    print("Available Models:")
    for model in models:
        print(model.name)
except Exception as e:
    print(f"Error: {e}")

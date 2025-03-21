import openai
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Print API key for debugging (REMOVE THIS AFTER TESTING)
print("Loaded API Key:", os.getenv("OPENAI_API_KEY"))

# Set API Key
openai.api_key = os.getenv("OPENAI_API_KEY")

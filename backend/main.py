from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get the Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize the Gemini API
if not GEMINI_API_KEY:
    raise ValueError("Gemini API key is missing! Check your .env file.")
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

# Serve static files (frontend)
app.mount("/static", StaticFiles(directory="frontend/public"), name="static")

@app.get("/")
async def root():
    return FileResponse("frontend/public/index.html")

@app.post("/generate-feedback/")
async def generate_feedback(file: UploadFile = File(...)):
    """
    Generate feedback using Google Gemini API
    """
    content = await file.read()
    text = content.decode("utf-8")  # Convert bytes to text

    try:
        # Call Gemini API
        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(f"Give detailed feedback on this student submission:\n{text}")
        
        # Extract the response text
        feedback = response.text

        return {"feedback": feedback}

    except Exception as e:
        return {"error": str(e)}

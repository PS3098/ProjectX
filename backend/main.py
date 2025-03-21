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

# ✅ Serve static files from the correct frontend build path
# Use the correct relative path to the frontend build
frontend_path = os.path.abspath("../frontend/dist")

# Check if the build folder exists
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="static")
    print(f"✅ Serving frontend from {frontend_path}")
else:
    print(f"❌ Frontend build directory not found: {frontend_path}")

@app.get("/")
async def root():
    """ Serve the React app """
    index_path = os.path.join(frontend_path, "index.html")

    if os.path.exists(index_path):
        return FileResponse(index_path)
    else:
        return {"error": "index.html not found"}

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

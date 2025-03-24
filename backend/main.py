from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
from docx import Document
import pdfplumber
from dotenv import load_dotenv
import logging

# ✅ Load environment variables
load_dotenv()

# ✅ Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ✅ Get the Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    logger.error("Gemini API key is missing! Check your .env file.")
    raise ValueError("Gemini API key is missing! Check your .env file.")

# ✅ Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# ✅ Create FastAPI app
app = FastAPI()

# ✅ CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ✅ Serve static files
frontend_path = os.path.abspath("../frontend/project/dist")
if os.path.exists(frontend_path):
    app.mount("/app", StaticFiles(directory=frontend_path, html=True), name="static")
    logger.info(f"✅ Serving frontend from {frontend_path}")
else:
    logger.error(f"❌ Frontend build directory not found: {frontend_path}")

# ✅ Catch-all route for React routing
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    """
    Serve React index.html for all routes to prevent 404s on page refresh
    """
    index_path = os.path.join(frontend_path, "index.html")

    if os.path.exists(index_path):
        return FileResponse(index_path)
    return JSONResponse(content={"error": "index.html not found"}, status_code=404)

# ✅ Function to extract text from PDF
def extract_text_from_pdf(file):
    with pdfplumber.open(file.file) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
        return text

# ✅ Function to extract text from DOCX
def extract_text_from_docx(file):
    doc = Document(file.file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def extract_topic(text: str) -> str:
    # Basic method: take the first sentence as the topic
    sentences = text.split(".")
    if sentences:
        return sentences[0]  # Return the first sentence as the topic
    return "Untitled"


# ✅ Backend route for feedback generation (handles both text input and file upload)
@app.post("/generate-feedback")
async def generate_feedback(
    file: UploadFile = File(None), text: str = Form(None)
):
    """
    Generate feedback using Google Gemini API
    - Accepts either a text file upload or plain text input
    """
    try:
        # If file is provided, extract its text
        if file:
            if file.content_type == "application/pdf":
                text = extract_text_from_pdf(file)
            elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                text = extract_text_from_docx(file)
            else:
                raise HTTPException(status_code=400, detail="Unsupported file type. Please upload a PDF or DOCX file.")
        
        # If no text is provided, raise an error
        if not text:
            raise HTTPException(status_code=400, detail="No input text or file provided.")
         # Extract the topic (first sentence for simplicity)
        topic = extract_topic(text)

        # Call Gemini API to generate feedback
        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(f"Give detailed feedback on this student submission:\n{text}")

        feedback = response.text

        return JSONResponse(content={"feedback": feedback}, status_code=200)

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


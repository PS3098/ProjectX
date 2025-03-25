from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os
import pdfplumber
from docx import Document
from dotenv import load_dotenv
import logging
import json

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

# ✅ Extract topic from text
def extract_topic(text: str) -> str:
    sentences = text.split(".")
    return sentences[0] if sentences else "Untitled"


# ✅ Backend route for feedback generation (handles file upload)
@app.post("/generate-feedback")
async def generate_feedback(file: UploadFile = File(None), text: str = Form(None)):
    """
    Generate feedback using Google Gemini API
    - Accepts either a text file upload or plain text input
    """
    try:
        if file:
            if file.content_type == "application/pdf":
                text = extract_text_from_pdf(file)
            elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                text = extract_text_from_docx(file)
            else:
                raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF or DOCX.")
        
        if not text:
            raise HTTPException(status_code=400, detail="No input text or file provided.")
        
        topic = extract_topic(text)

        # ✅ Generate Feedback
        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(f"Provide detailed feedback:\n{text}")
        feedback = response.text

        # ✅ Generate Score
        score_prompt = (
            "Evaluate the submission on a scale of 0 to 100 for clarity, grammar, and coherence. "
            "Return only the number."
        )
        score_response = model.generate_content(score_prompt)
        score_text = score_response.text.strip() if score_response.text else "50"
        try:
            score = int(''.join(filter(str.isdigit, score_text)))
            score = max(0, min(score, 100))  
        except ValueError:
            score = 50

        # ✅ Save to history
        history_path = "history.json"
        history = []
        if os.path.exists(history_path):
            with open(history_path, "r") as f:
                history = json.load(f)

        feedback_id = len(history) + 1

        history.append({
            "id": feedback_id,
            "topic": topic,
            "score": score,
            "feedback": feedback
        })

        with open(history_path, "w") as f:
            json.dump(history, f, indent=4)

        return JSONResponse(content={
            "id": feedback_id,
            "feedback": feedback,
            "score": score
        }, status_code=200)

    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# ✅ Route to fetch feedback history
@app.get("/history")
async def get_history():
    history_path = "history.json"
    if os.path.exists(history_path):
        with open(history_path, "r") as f:
            history = json.load(f)
        return JSONResponse(content=history, status_code=200)
    return JSONResponse(content=[], status_code=200)

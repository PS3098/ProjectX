import requests

url = "http://127.0.0.1:8000/generate-feedback/"
files = {"file": open("student_submission.txt", "rb")}

response = requests.post(url, files=files)
print(response.json())  # Get feedback from AI

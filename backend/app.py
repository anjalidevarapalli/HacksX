# Flask Server (server.py)
from flask import Flask, request, jsonify
import json
import google.generativeai as genai
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r"/generate_playlist": {"origins": "http://localhost:3000/schedule"}}), 

# Load environment variables from .env file
load_dotenv()


calendar_data = {
    "kind": "calendar#events",
    "summary": "User's Calendar",
    "items": [
        {
            "summary": "Morning Run",
            "start": {"dateTime": "2025-02-08T06:00:00-05:00"},
            "end": {"dateTime": "2025-02-08T07:00:00-05:00"},
            "description": "Exercise session at the gym"
        },
        {
            "summary": "Work Meeting",
            "start": {"dateTime": "2025-02-08T09:00:00-05:00"},
            "end": {"dateTime": "2025-02-08T10:00:00-05:00"},
            "description": "Project discussion with team"
        },
        {
            "summary": "Lunch Break",
            "start": {"dateTime": "2025-02-08T12:00:00-05:00"},
            "end": {"dateTime": "2025-02-08T13:00:00-05:00"},
            "description": "Relaxing lunch at a cafe"
        },
        {
            "summary": "Coding Session",
            "start": {"dateTime": "2025-02-08T15:00:00-05:00"},
            "end": {"dateTime": "2025-02-08T17:00:00-05:00"},
            "description": "Deep work programming session"
        },
        {
            "summary": "Evening Yoga",
            "start": {"dateTime": "2025-02-08T19:00:00-05:00"},
            "end": {"dateTime": "2025-02-08T20:00:00-05:00"},
            "description": "Calm meditation and stretching"
        },
        {
            "summary": "Night Party",
            "start": {"dateTime": "2025-02-08T22:00:00-05:00"},
            "end": {"dateTime": "2025-02-09T01:00:00-05:00"},
            "description": "Dancing and socializing"
        }
    ]
}

with open("calendar_data.json", "w") as file:
    json.dump(calendar_data, file, indent=4)



app = Flask(__name__)

genai.configure(api_key = os.getenv("GEMINI_API_KEY"))

# Load calendar data
def load_calendar_data():
    with open("calendar_data.json", "r") as file:
        return json.load(file)

# Extract keywords dynamically using AI
def extract_keywords(events):
    descriptions = "\n".join([event.get("summary", "") + " " + event.get("description", "") for event in events])
    prompt = f"Extract relevant keywords that describe the mood or activity for the following events:\n{descriptions}" \
             "\nReturn a comma-separated list of relevant keywords."
    
    response = genai.GenerativeModel("gemini-pro").generate_content(prompt)
    keywords = response.text.split(", ")
    return keywords

# Generate playlist from keywords
def generate_playlist(keywords):
    prompt = f"Generate a playlist of 15 songs each based on these activities, make it a bunch of youtube music links: {', '.join(keywords)}.\n"
    prompt += "For example, gym means energetic songs, yoga means calm songs, work means focus music."
    
    response = genai.GenerativeModel("gemini-pro").generate_content(prompt)
    return response.text.split("\n")

@app.route("/generate_playlist", methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type','application/json'], supports_credentials=True  )
def get_playlist():
    calendar_data = load_calendar_data()
    keywords = extract_keywords(calendar_data["items"])
    playlist = generate_playlist(keywords)
    print (jsonify({"playlist": playlist}))
    return jsonify({"playlist": playlist})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)


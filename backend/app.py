from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OKTA_CLIENT_ID = "YOUR_CLIENT_ID"
OKTA_CLIENT_SECRET = "YOUR_CLIENT_SECRET"
OKTA_DOMAIN = "https://your-okta-domain.okta.com"
GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar.readonly"

@app.route('/token', methods=['POST'])
def get_google_calendar():
    auth_token = request.json.get('token')
    headers = {"Authorization": f"Bearer {auth_token}"}
    
    user_info = requests.get(f"{OKTA_DOMAIN}/v1/userinfo", headers=headers).json()
    
    if 'sub' in user_info:
        google_calendar_data = requests.get(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            headers={"Authorization": f"Bearer {auth_token}"}
        ).json()
        return jsonify(google_calendar_data)

    return jsonify({"error": "Invalid token"}), 401

if __name__ == '__main__':
    app.run(debug=True)

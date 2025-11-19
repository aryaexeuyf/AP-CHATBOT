from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# Configure API key
API_KEY = "AIzaSyBqrL9yG440dC32pk9eGqZhVIyg8NB4frI"
genai.configure(api_key=API_KEY)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message', '')
        is_owner = data.get('is_owner', False)
        
        # Set up the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create context for the AI
        context = f"""
        Kamu adalah APBOT, sebuah asisten AI yang dibuat oleh AryaProject. 
        Jawablah dalam bahasa Jawa dengan gaya yang santai dan gunakan singkatan seperti manusia asli.
        Gunakan bahasa Jawa ngoko (kasual) dalam percakapan.
        {"Kamu sedang berbicara dengan pemilikmu (APTECH OFFICIAL), jadi jawab dengan hormat dan tunduk." if is_owner else ""}
        """
        
        # Generate response
        response = model.generate_content(f"{context}\n\nPertanyaan: {message}")
        
        return jsonify({
            'success': True,
            'response': response.text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
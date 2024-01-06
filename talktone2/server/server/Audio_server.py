from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
import librosa
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load the pre-trained audio model
audio_model = load_model('cnn2_latest.h5')

# Function to preprocess the input audio
def preprocess_audio(file_path, target_duration=3):
    # Load audio file
    audio, _ = librosa.load(file_path, sr=22050)

    # Rest of the code...

# Specify the temporary directory for saving uploaded files
TEMP_UPLOAD_DIR = '/tmp/'

@app.route('/predict_emotion', methods=['POST'])
def predict_emotion():
    # Check if the 'file' key is in the request files
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})

    file = request.files['file']

    # Save the received audio file to a temporary location
    temp_file_path = os.path.join(TEMP_UPLOAD_DIR, file.filename)
    file.save(temp_file_path)

    # Preprocess the input audio
    processed_audio = preprocess_audio(temp_file_path)
    print(processed_audio)

    # Rest of the code...

if __name__ == '__main__':
    app.run(debug=True)

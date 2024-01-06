from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors package
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from keras.models import load_model
import joblib
import scipy.sparse 
import speech_recognition as sr
import sys

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the saved model, vectorizer, and label encoder
model = load_model('harassment_detection_model.h5')
vectorizer = joblib.load('tfidf_vectorizer.pkl')
label_encoder = joblib.load('label_encoder.pkl')

def recognize_speech(filename):
    # Initialize the Recognizer
    r = sr.Recognizer()

    try:
        # Open the audio file
        with sr.AudioFile(filename) as source:
            # Listen for the data (load audio to memory)
            audio_data = r.record(source)
            # Recognize (convert from speech to text) using Google's speech recognition
            text = r.recognize_google(audio_data)
            return text
    except sr.UnknownValueError:
        print("Google Speech Recognition could not understand the audio")
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
    
    return None

# Example usage




@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the text data from the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'})

        file = request.files['file']
        print("file:", file.filename,flush=True)

        # Check if the file is not empty
        if file.filename == '':
            return jsonify({'error': 'No selected file'})

        recognized_text = recognize_speech(file)
        print(recognized_text)
        # if recognized_text:
        #     if file.filename == 'vulgar.wav':
        #         print("Recognized Text:", recognized_text,flush=True)
        #         recognized_text='I hate you girl'
        #     elif file.filename == 'vulgar1.wav':
        #         print("Recognized Text:", recognized_text,flush=True)
        #         recognized_text='girl'
        #     elif file.filename == 'vulgar2.wav':
        #         print("Recognized Text:", recognized_text,flush=True)
        #         recognized_text='I hate you lady'
        # else:
        #     print("Speech recognition failed.")

        # # Preprocess the text
        # text_tfidf = vectorizer.transform([recognized_text])
        # text_tfidf.sort_indices()

        # # Make predictions
        # predictions_proba = model.predict(text_tfidf)
        # predictions_class = (predictions_proba > 0.5).astype(int)
        # predicted_labels = label_encoder.inverse_transform(predictions_class.ravel())

        # # Return the predictions as JSON response
        # response = {
        #     'class': predicted_labels[0],
        #     'probability': float(predictions_proba[0][0])
        # }

        return jsonify(recognized_text)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/testing", methods=['GET'])
def testing_endpoint():
    print("Hello It worked")
    return jsonify({"Success": "Yay"})

@app.route('/chatGPT', methods=['POST'])
def chatGPT_endpoint():
    try:
        print("Hello im here")
        print(request)
        data = request.form
        print(data)

        new_convo = data['newConvo']
        text = data['transcript']

        # if new_convo:

        # Return a response
        return jsonify({'message': 'Request successful', 'newConvo': new_convo, 'transcript': transcript})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    cred = credentials.Certificate("./capstonecat-firebase.json")
    firebase_admin.initialize_app(cred)
    app.run(debug=True)

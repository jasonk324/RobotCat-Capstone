from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials, firestore
import json
import openai
from chatGPT.variable import apiKey, defaultContexts, defaultOutputs

app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

def chatGPTOutput(msgHistory, newInput):
    msgHistoryJson = json.loads(msgHistory)
    msgHistoryJson.append({'role': 'user', 'content': newInput})

    fullQuery = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = msgHistoryJson
    )
    
    response = fullQuery["choices"][0]["message"]["content"]

    msgHistoryJson.append({'role': 'assistant', 'content': response})

    return json.dumps(msgHistoryJson), response

def obtainDocID(personality):
    if personality == "Cat":
        documentId = "YsIBtN7cl7YNjXsv6zHe"
    elif personality == "Pirate":
        documentId = "7SjRlKVnNjl2Ep2cFrCe"
    elif personality == "Gym Bro":
        documentId = "fBYiP60gbIFoqVytTesV"
    return documentId

@app.route("/testing", methods=['GET'])
def testing_endpoint():
    print("Hello It worked")
    return jsonify({"Success": "Yay"})

@app.route('/chatGPTResponse', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
def chatGPTResponse_endpoint():
    data = request.form
    print(data)
    newInput = data['transcript']
    personality = data['personality']

    collectionName = "Conversations"
    docId = obtainDocID(personality)

    docRef = db.collection(collectionName).document(docId)
    doc = docRef.get()
    docData = doc.to_dict()
    
    docData["History"], docData["Output"] =  chatGPTOutput(docData["History"], newInput)

    docRef.update(docData)

    print(docData["Output"])
    print("Document updated successfully!")

    response = jsonify({"Response" : docData["Output"]})
    # response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')

    return response

@app.route('/chatGPTReset', methods=['POST'])
def chatGPTReset_endpoint():
    data = request.form
    personality = data['personality']

    collectionName = "Conversations"
    docId = obtainDocID(personality)
    
    docRef = db.collection(collectionName).document(docId)
    doc = docRef.get()
    docData = doc.to_dict()

    docData["History"], docData["Output"] =  defaultContexts[personality], defaultOutputs[personality]

    docRef.update(docData)
    
    print("Document updated successfully!")

    return jsonify({'success': "Nice Job"})

if __name__ == '__main__':
    # Firebase initalization
    cred = credentials.Certificate("capstonecat-firebase.json") 
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    # ChatGPT
    openai.api_key = apiKey

    # Start flask 
    app.run(debug=True)

import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timezone

cred = credentials.Certificate("./capstonecat-firebase.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
actions_ref = db.collection('Actions')

start_time = datetime.now(timezone.utc)

def on_snapshot(col_snapshot, changes, read_time):
    for change in changes:
        new_item = change.document.to_dict()
        created_at = new_item.get("createdAt")
        if created_at >= start_time:
            print(f"New item added: {new_item}")

actions_ref.on_snapshot(on_snapshot)

while True:
    pass
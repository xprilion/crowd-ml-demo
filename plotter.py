import datetime
import threading
from time import sleep

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account.
cred = credentials.Certificate('path/to/serviceAccount.json')

app = firebase_admin.initialize_app(cred)

db = firestore.client()

def listen_multiple():
    db = firestore.Client(project='crowd-ml-demo')
    # [START firestore_listen_query_snapshots]

    # Create an Event for notifying main thread.
    callback_done = threading.Event()

    # Create a callback on_snapshot function to capture changes
    def on_snapshot(col_snapshot, changes, read_time):
        print(u'Callback received query snapshot.')
        print(u'Current cities in California:')
        for doc in col_snapshot:
            print(f'{doc.id}')
        callback_done.set()

    col_query = db.collection(u'pairs')

    # Watch the collection query
    query_watch = col_query.on_snapshot(on_snapshot)

    # Wait for the callback.
    callback_done.wait(timeout=60)
    query_watch.unsubscribe()

listen_multiple()
from time import sleep
import matplotlib.pyplot as plt
from itertools import combinations
import pandas as pd
from matplotlib.animation import FuncAnimation 
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import numpy as np

cred = credentials.Certificate('./.key/service-account-key.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()

animals = ["parrot", "cat", "cow", "dog", "whale", "monkey", "human", "spider", "snake", "lizard", "buffallo", "goat"]
all_pairs = list(combinations(animals, 2))
all_pairs = sorted(all_pairs, key=lambda x: x[0])

data = pd.DataFrame(np.ones((len(animals), len(animals))), animals, animals)
n_frames = 10

fig = plt.figure()
plot = plt.matshow(data, fignum=0)

plt.ion()

def on_snapshot(col_snapshot, changes, read_time):
    global data, fig, plot
    print(u'Callback received query snapshot.')
    current_docs = {}
    for doc in col_snapshot:
        current_docs[doc.id] = doc.to_dict()

    for pair in all_pairs:
        pair_key = str(pair[0]) + "_" + str(pair[1])
        reverse_key = str(pair[1]) + "_" + str(pair[0])
        if (pair_key in current_docs.keys()):
            data.at[pair[0],pair[1]]=int(current_docs[pair_key]['score'])
            data.at[pair[1],pair[0]]=int(current_docs[pair_key]['score'])
        elif (reverse_key in current_docs.keys()):
            data.at[pair[0],pair[1]]=int(current_docs[reverse_key]['score'])
            data.at[pair[1],pair[0]]=int(current_docs[reverse_key]['score'])

    plot.set_data(data)
    fig.canvas.draw()
    fig.canvas.flush_events()

col_query = db.collection(u'pairs')

# Watch the collection query
query_watch = col_query.on_snapshot(on_snapshot)

plt.show()

sleep(30)
query_watch.unsubscribe()

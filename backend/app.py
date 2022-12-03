from flask import Flask, request
from flask_cors import CORS
import playlist_artists_genres
import model_control
import json

from gensim.models import Word2Vec
from gensim.models import KeyedVectors
import gensim.models as g

import math

app = Flask(__name__)
CORS(app)

file_path = "./datasets/origin_data.json"
genre_artists_path = "./datasets/genre_artists.json"
model_path = './models/augmented_genres_w10.model'

with open(file_path, 'r') as file:
    origin_data = json.load(file)

with open(genre_artists_path, 'r') as file:
    genre_artists_data = json.load(file)

model = KeyedVectors.load(model_path)

@app.route('/statistics', methods=['POST'])
def get_recommend_by_playlist():
    req_data = request.get_json()
    appear_artists = playlist_artists_genres.get_playlist_artists(req_data['playlist']['tracks']['items'])
    appear_genres = playlist_artists_genres.get_playlist_genres(appear_artists, origin_data)

    genres_count = playlist_artists_genres.genre_counter(appear_genres)
    genres_count.sort(key=lambda x:-x[1])

    genre_counts = [["Genres", "Counts"]]

    etc_count = 0
    genre_num = 0
    for idx, g in enumerate(genres_count):
        if idx < 10:
            tmp = [g[0].upper(), g[1]]
            genre_counts.append(tmp)
        else:
            etc_count = etc_count + g[1]
            genre_num = genre_num + 1

    if etc_count != 0:
        tmp_str = "Etc (" + str(genre_num) + "개의 장르)"
        genre_counts.append([tmp_str, etc_count])
    
    model_result = model_control.get_model_result(appear_genres, model)

    recommend_detail = model_control.get_recommend_genre_detail(model_result, genre_artists_data, appear_genres, model)

    response = {
        'genre_counts': genre_counts,
        'recommend_genre' : model_result,
        'recommend_detail' : recommend_detail,
    }

    return response


if __name__ == "__main__":
    app.run()

import json

def jprint(jsn):
    print(json.dumps(jsn, indent=3))

def get_playlist_artists(playlist_items_list):
    # 플레이리스트가 갖고있는 곡들의 json 데이터 배열을 입력하면 해당 플리의 아티스트 리스트를 리턴
    appear_artists = []
    
    for d in playlist_items_list:
        for artist in d['track']['artists']:
            appear_artists.append(artist['name'])
    
    #appear_artists = list(set(appear_artists))
    return appear_artists

def get_artist_genres(artist_name, origin_data):
    # 아티스트 이름과 원본 데이터를 입력하면 장르를 출력
    for d in origin_data:
        if d['artist_name'] == artist_name:
            if 'genres' in d:
                return d['genres']
            else: return []

def get_playlist_genres(appear_artists, origin_data):
    # 플레이리스트가 갖고있는 곡들의 아티스트 배열을 입력하면 해당 플리의 장르 리스트를 리턴
    genre_list = []
    for artist in appear_artists:
        genres = get_artist_genres(artist, origin_data)
        if genres:
            for g in genres:
                genre_list.append(g)

    return genre_list

def genre_counter(genre_list):
    # 장르가 등장한 빈도가 담긴 리스트를 출력
    genres = list(set(genre_list)) # genres는 중복을 제거한 리스트
    genre_count = []
    
    for g in genres:
        genre_count.append([g, genre_list.count(g)])
    
    return genre_count
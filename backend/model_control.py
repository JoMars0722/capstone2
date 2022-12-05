def make_positive_list(genre_list, model):
    # 장르 리스트를 입력받으면 word vector 내에 있는 vocabulary만 리턴
    positive_list = []
    for genre in genre_list:
        try:
            model.key_to_index[genre]
            positive_list.append(genre)
        except:
            continue

    return positive_list

def get_model_result(genre_list, model):
    positive_list = make_positive_list(genre_list, model)
    result = model.most_similar(positive=positive_list, topn=5)

    return result

def get_recommend_genre_detail(model_result, genre_artists_json, positive_list, model):
    result = []

    for _tuple in model_result:
        genre = _tuple[0]

        for d in genre_artists_json:
            if d['genre'] == genre:
                artists = d['artists'][:5]
                break
        
        tmp_model_res = model.most_similar(genre, topn=len(model.key_to_index))

        for r in tmp_model_res:
            similar_genre=''
            if r[0] in positive_list:
                similar_genre = r[0]
                break
        tmp_res = {
            'genre' : genre,
            'similar_genre' : similar_genre,
            'artists' : artists
        }
        result.append(tmp_res)

    return result


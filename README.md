# 장르 편향성 해소를 위한 Word2Vec 추천 시스템

# 요약

> Word2Vec을 이용해 장르 간 유사도를 나타내어 새로운 장르를 추천해주는 시스템입니다. Spotify 사용자의 재생목록을 입력으로 받은 뒤에 해당 재생목록의 전체 장르들과 유사한 새로운 장르 및 해당 장르와 관련된 아티스트를 표시합니다.
> 

# Installation

### Flask Server

1. 의존성 패키지 설치
    
    ```bash
    $ cd backend
    $ pip install -r requirments.txt
    ```
    
2. 다음 링크에서 models과 datasets 디렉토리를 ./backend에 다운로드
    
    [LINK](https://drive.google.com/drive/folders/1O1z4dTMnwHW4x539UGrwLpum2Tp8g6-D?usp=sharing)
    
3. backend/app.py 실행

### Frontend

1. 의존성 패키지 설치
    
    ```bash
    $ cd frontend
    $ npm install
    ```
    
2. Spotify API Key 생성
    1. 다음 링크로 로그인 [https://developer.spotify.com/dashboard/](https://developer.spotify.com/dashboard/)
    2. ‘CREATE AN APP’ 버튼 클릭해서 앱 생성
    3. client id 획득
    4. ‘EDIT SETTINGS’ 버튼 클릭 한 뒤에 Redirect URIs에 다음 링크 입력 [http://localhost:3000/callback/](http://localhost:3000/callback/)
    5. ./src/config.json에 (c)에서 획득한 client id 입력
        
        ```json
        {
            "development": {
                "spotify_client_id": "your client id"
            }
        }
        ```
        
3. 실행
    
    ```bash
    $ npm start
    ```

# 연구 배경

현재 음악 스트리밍 서비스의 추천 시스템은 협업 필터링과 콘텐츠 기반 필터링을 주축으로 개발되어 높은 성능을 보인다. 하지만 사용자의 경향을 시스템이 학습하기 때문에 필터 버블이 형성되는 문제가 생기고, 자주 듣는 장르에 해당하는 추천 결과만 발생하게 된다. 따라서 필터 버블로 인한 편향성을 해소하기 위해 Word2Vec을 이용해서 사용자가 새로운 장르의 결과물도 추천 받을 수 있도록 시스템을 제시한다.



# 관련 연구

### 추천 알고리즘

 추천 알고리즘은 사용자에게 알맞은 아이템을 추천하기 위한 기술이다. 추천 알고리즘은 크게 협업 필터링과 콘텐츠 기반 필터링으로 나뉘며, 대부분의 추천 시스템은 이 두가지를 바탕으로 독자적인 기술을 개발하여 사용한다.

1. 협업 필터링
    
    협업 필터링은 한 아이템에 대한 선호도가 비슷한 사용자 간에는 다른 아이템에 대해서도 비슷한 선호도를 보일 것이라는 가정을 바탕으로 한다. 아이템A를 선호하는 집단이 아이템B도 선호한다고 가정했을 때, 새로운 사용자가 아이템A에 선호도를 보이면 아이템B를 추천해주는 방식이다.
    
2. 콘텐츠 기반 필터링
    
    콘텐츠 기반 필터링은 사용자가 선호했던 아이템과 메타데이터가 유사한 아이템을 추천하거나, 사용자가 사전에 입력한 프로파일 정보를 토대로 그에 해당하는 아이템을 추천해주는 방식이다.
    
    <img src = "https://user-images.githubusercontent.com/72954921/205452416-3bb49305-8300-4149-bf5b-ab615a3bac56.png" width="50%">
    
    
    협업 필터링과 콘텐츠 기반 필터링(Abhijeet Anand, 2020.09.30)
    

### Word2Vec

 Word2Vec은 2013년에 구글이 발표한 연구로, 모델 내부의 심층 신경망을 이용해 문장 내 단어를 다차원 벡터로 변환하는 모델이다. Word2Vec는 중심 단어로 주변 단어를 예측하는 Skip-Gram 방식과 주변 단어로 중심 단어를 예측하는 CBOW 방식이 있다. 분산 표현을 통해서 단어의 의미를 여러 개의 차원에 분산시키고 그 분산 벡터를 바탕으로 단어 간 유사도를 계산한다.



# Word2Vec 모델 학습

### 데이터 수집

 데이터의 수집에는 Spotify API를 사용했다. Spotify는 아티스트에 대해서 ‘연관 아티스트’와 관련 장르를 제공하기 때문에 연관성을 지닌 데이터를 확보하는 것에 유리하다고 판단했기 때문이다.

 하지만 Spotify API를 사용해 아티스트의 정보를 받는 방식에는 아티스트의 고유 ID값이 필요하기 때문에, 우선은 해당 ID값을 먼저 수집해야 한다. 따라서 Spotify가 제공하는 글로벌 차트 및 71개국의 약 9년간의 일간 차트를 이용하여 수집했다. 이를 통해서 29,254개의 아티스트 ID를 확보했다. 이를 통해 연관 아티스트의 ID와 데이터를 수집하는 방식으로 121,171명의 아티스트 데이터, 5,302개의 장르 레이블, 26,768개의 연관 아티스트 레이블을 확보했다.

### 데이터 전처리

 수집한 데이터의 구조는 다음과 같다.

| Field Name | Description |
| --- | --- |
| artist_id | Artist ID (string) |
| artist_name | Artist name (string) |
| genres | Genres (list of genres) |
| relate_artists | Related artists (list of artist_id) |
| total_followers | Number of followers (int) |
| popularity | Popularity (int) |

 이후의 데이터 전처리 과정은 다음과 같다. 우선 아티스트를 표현하는 Genre 하나 하나를 단어로 취급하고, 해당 아티스트의 Genre 리스트를 한 문장으로 간주한다. 그 후에 문장들의 리스트를 Word2Vec 모델의 입력 파라미터로 만든다.

<img src = "https://user-images.githubusercontent.com/72954921/205452384-75d733f2-250e-4f1b-b222-dbb283c7a2bc.png" width="30%">


이렇게 만든 121,171개의 문장에 추가적으로 연관 아티스트 데이터를 활용해서 연관 아티스트들의 장르 벡터를 추가하여 데이터 증강을 진행했다.

![image](https://user-images.githubusercontent.com/72954921/205452335-33088467-55c1-4f3b-8d15-f249a6981f83.png)

### 모델 적용

전처리 과정을 진행하고, Word2Vec 모델의 하이퍼 파라미터를 다음과 같이 설정했다.

| Parameter | Value | Description |
| --- | --- | --- |
| vector_size | 300 | 단어의 임베딩 벡터 차원의 수 |
| window | 10 | 단어의 앞 뒤로 유사도를 고려하는 개수 |
| min_count | 10 | 해당 빈도수보다 낮게 등장한 단어는 vocabulary에서 제외 |
| workers | 4 | 학습 시 이용할 스레드 개수 |
| epochs | 5 | 전체 데이터를 반복해서 확인하고 업데이트 하는 횟수 |
| sg | 1 | CBOW는 0, Skip-Gram은 1 |

해당 하이퍼 파라미터를 설정하고 5,302개의 장르로 구성된 147,939개의 문장을 모델에 입력한다. min_count에 의해 해당 빈도수보다 낮게 등장한 단어는 vocabulary에서 제외되므로 vocabulary 내의 최종 장르 레이블은 5,302개에서 4,134개로 축소되었다. Word2Vec 모델이 비지도 학습을 통해 장르끼리 군집을 형성하고, 그 군집을 2차원으로 변형해 400개의 장르를 t-SNE로 시각화 한 결과는 다음과 같다.

![image](https://user-images.githubusercontent.com/72954921/205452205-58bcc612-9dd5-4fac-9132-3eb90e21f8f9.png)



# 구현

### 아키텍처

<img src = "https://user-images.githubusercontent.com/72954921/205452061-e8e61709-f337-447d-adf6-ef26a69e51fc.png" width="50%">


### 실행화면

#### 로그인 시 최초 화면
![image](https://user-images.githubusercontent.com/72954921/205452088-c4ff9a15-639d-48ee-8fe9-e3053e8c7db2.png)


#### 플레이리스트 선택 시 화면
![image](https://user-images.githubusercontent.com/72954921/205452174-98b70c20-34d3-4ddc-841f-764000209c4e.png)


#### 추천 장르 목록
<img src = "https://user-images.githubusercontent.com/72954921/205452035-3f7ec045-8ca2-4bdb-a257-676b28d1c89a.png" width="30%">





# 개선점

1. 추천 시스템의 성능을 측정하지 않았기 때문에, 추후 결과물에 대해 판단할 수 있는 객관적인 지표가 필요하다.
2. 5,000여 개의 장르 데이터를 확보했는데, 해당 장르들은 ‘miami hip hop’이나 ‘korean indie’, ‘london rap’ 같은 식으로 지역이나 ‘국가 + 구체적인 장르’ 의 형태로 제시되는 경우가 대부분이다. 따라서 이 것을 국적이나 지역으로 세부적으로 분리하면 더 좋은 추천 결과물을 얻을 수 있을 것으로 보인다.
3. Word2Vec 학습 시에 단어의 배열 순서에 따라 결과물이 바뀌는 것을 확인해 인기도 순으로 중앙에 가도록 배치하였는데, 이러한 작업이 실제로 결과물에 얼마나 영향을 끼치는지 측정할 수단이 필요하다.
4. Word2Vec 학습 시에 하이퍼 파라미터를 자의적인 판단으로 설정하였는데, 그리드 서치를 이용해 최적 값을 찾는다면 추천 성능을 향상시킬 수 있을 것이라 생각한다.



# 참고 문헌

[1] 강부식 (2018). Word2Vec을 이용한 사용자기반 협업필터링의 예측 정확도 개선. 한국지식정보기술학회지, 13(1), 169-176.

[2] 김태호, 이연창, 김상욱 (2021). 암시적 피드백을 다루는 협업 필터링 기반 추천 방법들의 최신 동향. 정보과학회지, 39(3), 30-36.

[3] 손지은, 김성범, 김현중, 조성준 (2015). 추천 시스템 기법 연구동향 분석. 대한산업공학회지, 41(2), 185-208.

[4] 신유진 (2020). 유튜브(YouTube) 추천 알고리즘으로 인한 필터 버블(filter bubble) 현상 연구. 연세대학교 정보대학원 석사학위논문.

[5] 이현수, 홍성은, 방준일, 김화종 (2020). 데이터 임베딩을 활용한 사용자 플레이리스트 기반 음악 추천에 관한 연구. 한국정보기술학회지, 13(9), 27-34.

[6] 홍동균, 이연창, 김상욱, 이종욱 (2017). 추천 시스템에서의 컨텐츠 기반 필터링 기법의 효과. 한국정보과학회 2017년 한국컴퓨터종합학술대회 논문집, 266-267.

[7] 황태규, 박찬수, 김수철, 김성권 (2013). 장르 벡터를 이용한 음악추천시스템. 한국정보과학회 2013년 한국컴퓨터종합학술대회 논문집, 1491-1493.

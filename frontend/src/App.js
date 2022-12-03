import './css/App.css';
import React, { useEffect, useState} from 'react';
import Login from './components/Login';
import Main from './components/Main';
import AppContext from './components/AppContext';
import Cookies from 'js-cookie'

function App() {
  //const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [spotifyAuthToken, setSpotifyAuthToken] = useState();
  //전역변수
  const [ searchRequest, setSearchRequest ] = useState(null);
  const [ searchResponse, setSearchResponse ] = useState(null);
  const [ selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [ selectedPlaylistURL, setSelectedPlaylistURL] = useState(null);
  const [ playingPlaylist, setPlayingPlaylist] = useState(null);
  const [ playingTrackList, setPlayingTrackList ] = useState(null);
  const [ recommendSource, setRecommendSource ] = useState(null)
  const [ recommendCategory, setRecommendCategory ] = useState(['tempo', 'danceability', 'acousticness', 'energy']);

  const changeSearchRequest = (value) => {
    setSearchRequest(value);
  }
  const changeSelectedPlaylist = (value) => {
    setSelectedPlaylist(value);
  }
  const changeSelectedPlaylistURL = (value) => {
    setSelectedPlaylistURL(value);
  }
  const changePlayingPlaylist = (value) => {
    setPlayingPlaylist(value);
  }
  const changePlayingTrackList = (value) => {
    setPlayingTrackList(value);
  }
  const changeSetSearchResponse = (value) => {
    setSearchResponse(value)
  }
  const changeRecommendSource = (value) => {
    setRecommendSource(value);
  }
  const changeRecommendCategory = (value) => {
    setRecommendCategory(value);
  }


  const globalVar = {
    searchRequest: searchRequest,
    searchResponse: searchResponse,
    selectedPlaylist: selectedPlaylist,
    playingPlaylist: playingPlaylist,
    playingTrackList: playingTrackList,
    recommendSource: recommendSource,
    recommendCategory: recommendCategory,
    changeSearchRequest,
    changeSelectedPlaylist,
    changePlayingPlaylist,
    changePlayingTrackList,
    changeSetSearchResponse,
    changeRecommendSource,
    changeRecommendCategory
  }

  useEffect(() => {
    setSpotifyAuthToken(Cookies.get('spotifyAuthToken'))
  }, [Cookies.get('spotifyAuthToken')]);


  return (
    <AppContext.Provider value={globalVar}>
      <div className="App">
        {Cookies.get('spotifyAuthToken') ? // 로그인 세션 확인하고 화면 렌더링 
          <Main /> :
          <Login />}
      </div>
    </AppContext.Provider>
  );
}

export default App;

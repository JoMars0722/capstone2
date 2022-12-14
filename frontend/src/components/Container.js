import React, { useState, useEffect, useContext } from "react";
import "../css/Container.css";
import CategoryRow from "./CategoryRow.js";
import RecommendList from "./RecommendList";
import TrackContainer from "./TrackContainer";
import AppContext from "./AppContext";
import SearchView from "./SearchView";
import axios from "axios";
import Cookies from "js-cookie";

// Body > Container
function Container(props){
    const [playlistItems, setPlaylistItems] = useState(null);
    console.log('Container Render');
    const globalVar = useContext(AppContext);
    
    const categories = [
        {'id' : '1', 'name' : '', 'playlists' : props.playlists},
    ]

    

    const getPlaylistItems = async () => {
        console.log('get playlist items', globalVar.selectedPlaylist)
        await axios.get("https://api.spotify.com/v1/playlists/"+ globalVar.selectedPlaylist.id, {
            headers: {
                Authorization: `Bearer ${Cookies.get('spotifyAuthToken')}`
            }
        })
        .then(function (res) {
            console.log(res.data)
            setPlaylistItems(() => res.data)
        })
    }

    useEffect(() => {
        if(globalVar.selectedPlaylist !== null){
            getPlaylistItems();
        }
    }, [globalVar.selectedPlaylist])

    // 선택된 플레이리스트가 있으면 해당 플레이리스트에 대한 정보 fetch
    return (
        <div className="container">
            {globalVar.searchRequest !== null ? (
                <div className="search__container">
                    <SearchView searchRequest={globalVar.searchRequest}/>
                    <RecommendList playlistItems = {playlistItems} />
                </div>
            ):(globalVar.selectedPlaylist !== null ?(
                <div className="select__container">
                    <TrackContainer playlistItems = {playlistItems} />
                    <RecommendList playlistItems = {playlistItems} />
                </div>
            ):(
                <div className="category__container">
                    {categories && categories.map((category, index) => (
                        <div className="category__belt" key={index}>
                            <div className="category__name">{category.name}</div>
                            <CategoryRow playlists={category.playlists} />
                            <hr />
                        </div>
                    ))}
                </div>
            ))}

        </div>
    );
}
export default Container;

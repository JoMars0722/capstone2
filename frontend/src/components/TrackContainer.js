import React, { useState, useEffect, useContext } from "react";
import { IoPlayCircle } from "react-icons/io5"
import "../css/TrackContainer.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import axios from "axios";

// Container > TrackContainer
function TrackContainer(props) {
    console.log('Playlist Items : ', props.playlistItems)

    const globalVar = useContext(AppContext);

    const submitPlaylistToPlay = () => {
        const tmpPlayTrackList = [];
        props.playlistItems && props.playlistItems.map((track, index) => {
            tmpPlayTrackList.push('spotify:track:'+track.id);
        })
        globalVar.changePlayingTrackList(tmpPlayTrackList)
    }

    const submitTrackFromItem = (value) => {
        const tmpPlayTrackList = [];
        props.playlistItems && props.playlistItems.map((track, index) => {
            if (index >= value) {
                tmpPlayTrackList.push('spotify:track:'+track.id);
            }
        })
        globalVar.changePlayingTrackList(tmpPlayTrackList)
    }

    return(
        <div className="track__container">
            <div className="playlist__info">
                <img src={globalVar.selectedPlaylist.images[0].url} width='200' height='200' alt="cover"/>
                <div className="playlist__info__name">
                    <p>{globalVar.selectedPlaylist.name}</p>
                    <button onClick={ () => {
                        submitPlaylistToPlay(globalVar.selectedPlaylist.name)
                    }}>
                        <IoPlayCircle className="playlist__info__play__circle" size='50' color="#1db954" />
                    </button>
                </div>
                
            </div>
            <div className="playlist__tracks">
                <div className="playlist__track__category">
                    <TrackCategory />
                </div>
                <div className="track__list">
                    {props.playlistItems && props.playlistItems.tracks.items.map((track, index) => (
                        <TrackInfo track={track} order={index+1} submitTrackFromItem={submitTrackFromItem} key={index} />
                    ))}
                </div>    
            </div>
        </div>
    );
}
export default TrackContainer;
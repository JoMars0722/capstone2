import React, { useState, useEffect } from "react";
import { IoPlayCircle } from "react-icons/io5"
import "../css/TrackInfo.css";

function TrackInfo(props) {
    const [isMouseOver, setIsMouseOver] = useState(0);

    const submitTrackToPlay = (value) => {
        props.submitTrackFromItem(value);
    }

    return(
        <div className="track__info" onMouseOver={ () => setIsMouseOver(1)}
                                        onMouseOut={ () => setIsMouseOver(0)}>
            <div className="track__order">
                {props.order}
            </div>
            {isMouseOver ?
                <div className="track__info__play__button">
                    <button onClick={ () => {
                        submitTrackToPlay(props.order-1)
                    }}>
                        <IoPlayCircle className="track__info__play__circle" size='50' color="#1db954" />
                    </button>
                </div>
                : <img src={props.track.track.album.images[0].url} className="track__cover" alt="cover"/>
            }
            

            <div className="track__detail">
                <div className="album__title__box">
                    <div className="title__info">
                        {props.track.track.name}
                    </div>
                    <div className="album__info">
                        {props.track.track.album.name}
                    </div>
                </div>

                <div className="artist__box">
                    <div className="artist__info">
                        {props.track.track.artists[0].name}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TrackInfo;
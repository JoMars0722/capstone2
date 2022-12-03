import React, { useState, useEffect, useContext } from "react";
import "../css/GenreInfo.css"
import Artist from "./Artist";

function GenreInfo(props) {
    console.log('GenreInfo', props)
    return(
        <div className="genre__info">
            <div className="genre__name">
                {props.genre.genre.toUpperCase()}
            </div>
            <div className="similar__genre">
                <small>Similar with </small>
                <b>
                    {props.genre.similar_genre.toUpperCase()}
                </b>
            </div>
            <div className="artists__container">
                {props.genre.artists && props.genre.artists.map((artist, index) => (
                    <Artist artist={artist} order={index+1} />
                ))}
            </div>
            
        </div>
    );
}
export default GenreInfo;
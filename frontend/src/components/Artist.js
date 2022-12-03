import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../css/Artist.css"
import Cookies from "js-cookie";

function Artist(props) {
    console.log('Artist', props)
    const [artistImgURL, setArtistImgURL] = useState(null);

    const getPlaylistItems = async () => {
        console.log('fetch artist image')
        await axios.get("https://api.spotify.com/v1/artists/"+ props.artist[2], {
            headers: {
                Authorization: `Bearer ${Cookies.get('spotifyAuthToken')}`
            }
        })
        .then(function (res) {
            console.log(res.data)
            setArtistImgURL(() => res.data['images'][0]['url'])
        })
    }

    useEffect(() => {
        if(props.artist !== null){
            getPlaylistItems();
        }
    }, [props.artist])


    return(
        <div className="artist__info">
            <div className="artist__img">
                <img
                    src={artistImgURL}
                    width='150'
                    height='150'
                    alt=""
                />
            </div>
            <div className="artist__name">
                {props.artist[0]}
            </div>
            
        </div>
    );
}
export default Artist;
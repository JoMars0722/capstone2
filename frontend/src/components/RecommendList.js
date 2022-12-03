import React, { useState, useEffect, useContext } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import "../css/RecommendList.css";
import TrackCategory from "./TrackCategory";
import TrackInfo from "./TrackInfo";
import AppContext from "./AppContext";
import axios from "axios";
import Piechart from "./Piechart";
import GenreInfo from "./GenreInfo";




function RecommendList(props) {
    const [recommendSettingOpen, setRecommendSettingOpen] = useState(false);
    const [songIdList, setSongIdList] = useState(null);
    const [recommendItems, setRecommendItems] = useState(null);
    const [recommendSetting, setRecommendSetting] = useState(null);
    const [genreCount, setGenreCount] = useState(null);
    const [recommendDetail, setRecommendDetail] = useState(null);
    const globalVar = useContext(AppContext);

    const makeSongIdList = () => {
        const tmpSongIdList = [];
        props.playlistItems && props.playlistItems.tracks.items.map((track, index) => {
            tmpSongIdList.push(track.id);
        })
        setSongIdList(tmpSongIdList);
    }

    const fetchRecommendByList = async () => {
        if (globalVar.searchRequest===null){
            await axios.post("http://127.0.0.1:5000/statistics", {
                playlist: props.playlistItems
            }).then(function (res) {
                //setRecommendItems(res.data);
                console.log("리퀘스트 응답",res.data)
                setGenreCount(res.data['genre_counts'])
                setRecommendDetail(res.data['recommend_detail'])
            })
        }
    }

    const fetchRecommendByItem = async () => {
        await axios.post("/recommend/song", {
            songId: globalVar.recommendSource,
            category : globalVar.recommendCategory,
        }).then(function (res) {
            setRecommendItems(res.data);
            console.log(res.data)
        })
    }
    
    useEffect(() => {
        if(globalVar.searchRequest === null && songIdList !== null) {
            fetchRecommendByList();
        }
    },[globalVar.recommendCategory]);

    useEffect(() => {
        if(globalVar.searchRequest === null && songIdList !== null){
            fetchRecommendByList();
        }
    },[songIdList])

    useEffect(() => {
        if(globalVar.searchRequest === null && props.playlistItems !== null){
            makeSongIdList();
        }
    }, [props.playlistItems])

    useEffect(() => {
        if(globalVar.recommendSource !== null) {
            fetchRecommendByItem();
        }
    }, [globalVar.recommendSource, globalVar.recommendCategory])


    return(
        <div className="recommend__list">
            <Piechart data={genreCount}/>
            <div className="recommend__title">
                RECOMMEND DETAILS
            </div>
            
            <div className="recommend__genres">
                <div className="recommend__genre__list">
                    {recommendDetail && recommendDetail.map((genre, index) => (
                        <GenreInfo genre={genre} order={index+1} />
                    ))}
                </div>    
            </div>

        </div>
    );
}
export default RecommendList;
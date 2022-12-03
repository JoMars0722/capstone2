import React, { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";
import Player from "./Player";

// App > Main
function Main(){
    console.log('Main 출력')
    return (
        <div>
            <Header />
            <Body />
            <Player />
        </div>
    )

    //return (
    //    <div>
    //        <Header />
    //        <Body />
    //        <Player />
    //    </div>
    //);
}
export default Main;
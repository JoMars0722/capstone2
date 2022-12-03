import React, { useState, useEffect } from "react";
import SpotifyAuth from './SpotifyAuth'
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import '../css/Login.css'

// App > Login
function Login(props) {
    return (
        <div className='login'>
          <img
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt=""
          />
          <SpotifyAuth
            btnClassName="login__btn"
            redirectUri={ "http://localhost:3000/callback/" }
            clientID={ "675c2f32de9544ecadbb5ccc50929a90" }
            title={"Login to Spotify"}
            noLogo={true}
            scopes={ [
              "user-read-currently-playing",
              "user-read-recently-played",
              "user-read-playback-state",
              "user-top-read",
              "user-modify-playback-state",
              "user-read-private", 
              "user-read-email", 
              "playlist-modify-public", 
              "playlist-modify-private", 
              "playlist-read-private",
              "user-library-modify", 
              "user-library-read"
            ] }
          />
        </div>
    );
}
export default Login;
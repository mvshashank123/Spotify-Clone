import React,{ useEffect, useState } from 'react';
import './App.css';
import Login from './Login.js';
import {getTokenFromUrl} from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import {useDataLayerValue} from './DataLayer';

const spotify =new SpotifyWebApi();           //creating instance of spotify from spotifywebapi

function App() {
  //short term memory
  const [token,setToken]=useState(null);
  const [{user},dispatch]=useDataLayerValue();

    //runs code based on a given condition
    useEffect(()=>{
        const hash=getTokenFromUrl();        //fetches url with token
        window.location.hash="";            //clears the url after fetching the access token

        const _token=hash.access_token;      //accessed the token

        if(_token){

          dispatch({
            type:'SET_TOKEN',
            token:_token,
          })
          setToken(_token);                   //the token is stored in a hook
          
          spotify.setAccessToken(_token);      //this is the token key with which the react and spotify api communicate
          
          spotify.getMe().then((user) => {       //this gets a user object token and prints it
            dispatch({
              type:'SET_USER',
              user: user,
            });
          });
        }

        //console.log('I HAVE A TOKEN: ',_token);
        spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type:"SET_PLAYLISTS",
          playlists:playlists,
        })
      });
        //Playlist Id
        spotify.getPlaylist('id of playlist').then(response =>{
          dispatch({
            type:"SET_DISCOVER_WEEKLY",
            discover_weekly:response,
          })
        })

         }, [token,dispatch]);


  return (
    <div className="App">
      {
        token ? (
          <Player spotify={spotify}/>
        ):(
        <Login/>
        )
      }


      {/*Spotify logo*/}

      {/*Login with spotify button*/}
    

    </div>
  );
}

export default App;

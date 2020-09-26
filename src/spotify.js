//https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#


//1.click login button
//2.redirect to spotify login page
//3.redirect to home page once logged


export const authEndpoint="https://accounts.spotify.com/authorize";
const redirectUri ="http://localhost:3000/";
const clientId="";              //client Id from spotify for developers

const scopes=[
    "user-read-currently-playing",          //this is very important we give all the permissions by the scopes in loginurl
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromUrl= ()=>{
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial,item)=>{
        let parts=item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        
        return initial;
    },{});
}

export const loginUrl=`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
    )}&response_type=token&show_dialog=true`;




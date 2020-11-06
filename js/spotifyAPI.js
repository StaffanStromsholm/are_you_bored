let popupOpen = false;
const popupModal = document.getElementById('category-popup');
const musicBoxes = document.querySelectorAll('.music');

//============== SPOTIFY API ==============
const clientId = '139751bc115f43329c1ed10b37f49eef';
const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';
let token;
let genreId;
let tracksEndPoint;
let spotifylistTitle;

// private methods
const getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    token = data.access_token;

    const getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;
    
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
    
        const data = await result.json();
        spotifylistTitle = data.playlists.items[0].description;
        console.log(spotifylistTitle)
        tracksEndPoint = data.playlists.items[0].tracks.href;
    }

    const getTracks = async (token, tracksEndPoint) => {
        const limit = 10;
        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json()
        const spotifyURIs = [];
        data.items.forEach(track => {
            spotifyURIs.push(track.track.uri);
        });

        let i = -1;

        console.log(tracksEndPoint);

        let html = `<h2>${spotifylistTitle}</h2>`
        html += data.items.map(item => {
            i++
            return `<li><a href=${spotifyURIs[i]}>${item.track.name}</a></li>`
        })
        
        document.getElementById('category-list').innerHTML = html;
        return data.items;

    }
    getPlaylistByGenre(token, genreId)
    getTracks(token, tracksEndPoint);
}

//add eventlisteners to all music category boxes
musicBoxes.forEach(box => box.addEventListener('click', (e) => {
    popupModal.classList.remove('hide');
    popupOpen = true;
    genreId = e.target.innerText.toLowerCase();
    getToken();
    getPlaylistByGenre(token, genreId);
}))

const closePopup = () => {
    popupModal.classList.add('hide');
    popupopen = false;
}


// const UIController = (function () {
//     const musicCategories = {
//         musicRock: "#music_rock",
//         musicPop: "#music_pop",
//         musicEDM: "music_edm",
//         musicJazz: "music_jazz",
//         musicMetal: "music_metal",
//         musicClassiscal: "music_rnb",
//     }

//     const categoryList = document.getElementById('category-list');

//     return {
//         categories() {
//             return {
//                 musicRock: document.querySelector(musicCategories.musicRock),
//                 categoryList: categoryList
//             }
//         }

//     }
// })();

// document.getElementById('music_rock').addEventListener('click', (e)=>{

// })

// document.getElementById('music_pop').addEventListener('click', (e)=>{
//     genreId = e.target.innerText.toLowerCase();
//     console.log(genreId, tracksEndPoint)
//     getToken();
//     getPlaylistByGenre(token, genreId);
// })

// document.getElementById('music_jazz').addEventListener('click', (e)=>{
//     genreId = e.target.innerText.toLowerCase();
//     console.log(genreId, tracksEndPoint)
//     getToken();
//     getPlaylistByGenre(token, genreId);
// })

// document.getElementById('music_hiphop').addEventListener('click', (e)=>{
//     genreId = e.target.innerText.toLowerCase();
//     console.log(genreId, tracksEndPoint)
//     getToken();
//     getPlaylistByGenre(token, genreId);
// })


// _getGenres(token);
// _getPlaylistByGenre(token, genreId);
// _getTracks(token, "https://api.spotify.com/v1/playlists/37i9dQZF1DWXRqgorJj26U/tracks");

// let genreId;



// document.getElementById('music_pop').addEventListener('click', (e)=>{
//     console.log(e.target.innerText)
//     spotifyController(e.target.innerText);
// })



//gets a list of all 20 genres
// const getGenres = async (token) => {

//     const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
//         method: 'GET',
//         headers: { 'Authorization': 'Bearer ' + token }
//     });

//     const data = await result.json();
//     console.log(data.categories.items)
// }
//


// const AppController = (function(UIController, APIController){
//     const categories = UIController.categories();
//     console.log(categories);

// })();

// (function () {
//     const clientId = '139751bc115f43329c1ed10b37f49eef';
//     const clientSecret = '3a241c55178d456ca803c1b8a8ae11d6';

//     // private methods
//     const _getToken = async () => {

//         const result = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret)
//             },
//             body: 'grant_type=client_credentials'
//         });
//         console.log('here')

//         const data = await result.json();
//         return data.access_token;
//     }

//     const _getGenres = async (token) => {

//         const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const data = await result.json();
//         console.log(data.categories.items)
//         return data.categories.items;
//     }

//     const _getPlaylistByGenre = async (token, genreId) => {

//         const limit = 10;

//         const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer' + token }
//         });

//         const data = await result.json();
//         return data.playlists.items;
//     }

//     const _getTracks = async (token, tracksEndPoint) => {

//         const limit = 10;

//         const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const data = result.json();
//         return data.items;
//     }

//     const _getTrack = async (token, trackEndPoint) => {

//         const result = await fetch(`${trackEndPoint}`, {
//             method: 'GET',
//             headers: { 'Authorization': 'Bearer ' + token }
//         });

//         const data = await result.json();
//         return data;
//     }

//     return {
//         getToken() {
//             return _getToken();
//         },
//         getGenres(token) {
//             return _getGenres(token);
//         },
//         getPlaylistByGenre(token, genreId) {
//             return _getPlaylistByGenre(token, genreId);
//         },
//         getTracks(token, tracksEndPoint) {
//             return _getTracks(token, tracksEndPoint)
//         },
//         getTrack(token, trackEndPoint) {
//             return _getTrack(token, trackEndPoint);
//         }
//     }

// })();


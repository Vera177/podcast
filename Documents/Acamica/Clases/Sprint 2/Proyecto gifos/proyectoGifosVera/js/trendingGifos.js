/* Trending gifOS */

let info;

async function getImages() {
    let response  = await fetch ('https://api.giphy.com/v1/gifs/trending?api_key=np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg&limit=25&rating=g');
    info = await response.json ();
    renderView(info);
}

getImages();

let gifSources = document.getElementById('gifSources');
let cardGifo;

function renderView(info) {
    for (let i = 0; i < 15; i++) {
    cardGifo = document.createElement('li');
    cardGifo.className = 'cardGifo';
    cardGifo.innerHTML = `<img id="imageId${[i]}" class="imagesTrendingGifos" src="${info.data[i].images.original.url}" alt="imagen gif">
    <div class="overlay">
        <div class="buttonsCard">
        <button id="favourite ${[i]}"class="favourite"><img src="./assets/icon-fav.svg" alt="guardar favorito"></button>
        <button class="download"><img src="./assets/icon-download.svg" alt="descargar"></button>
        <button class="superSize"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
        </div>
        <div class="infoTextGifs">
            <p>${info.data[i].username}</p>
            <p>${info.data[i].title}</p>
        </div>
    </div>`;
    gifSources.appendChild(cardGifo);
    favouriteBottonAndSetStorage(i, info);
    }
}

/* srcoll left/right images carrousel */

let buttonSliderLeft = document.getElementById('buttonSliderLeft');
let buttonSliderRight = document.getElementById('buttonSliderRight');

buttonSliderLeft.addEventListener('click', () => gifSources.scrollLeft -= gifSources.offsetWidth);
buttonSliderRight.addEventListener('click', () => {
    gifSources.scrollLeft += gifSources.offsetWidth
    if (gifSources.scrollLeft === 4518) {
        gifSources.scrollLeft = 0;
    }
});


/*favourite gifs buttons and selection*/

let favouriteGifs = [];
let favourite = document.getElementById('favourite');

function loaddStorage () {
    if (localStorage.getItem('favourites')) {
        favouriteGifs = JSON.parse(localStorage.getItem('favourites'));
    }
}
loaddStorage();

function favouriteBottonAndSetStorage (i, info) {
    let favouriteBottons = document.getElementById(`favourite ${[i]}`);
    favouriteBottons.addEventListener('mouseover', () => favouriteBottons.setAttribute('src', './assets/icon-fav-hover.svg'));
    favouriteBottons.addEventListener('mouseout', () => favouriteBottons.setAttribute('src', './assets/icon-fav.svg'));
    favouriteBottons.addEventListener('click', function () {
        favouriteGifs.push(info.data[i].id);
        localStorage.setItem('favourites', JSON.stringify(favouriteGifs));
        // favouriteBottons.addEventListener('click', () => favouriteBottons.setAttribute('src', './assets/icon-fav-active.svg'));      
        // renderViewFavouriteGifs(info);
        })
}
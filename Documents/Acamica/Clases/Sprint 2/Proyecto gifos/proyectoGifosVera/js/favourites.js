// Función cargar LocalStorage desde la array vacía. addEventListener sobre el botón me gusta. Eso lo agrega a una array vacía, que se va a pushear y de ahí cargar al LocalStorage
//Otra función para renderizar.
let apiKey = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let favouriteGifss = [];
let gifFavourites = document.getElementById('gifFavourites');
let cardGifoFavourite;

async function getImagess() {

    favouriteGifss = JSON.parse(localStorage.getItem('favourites'));

    //forma1

    // for (let i = 0; i < JSON.parse(localStorage.getItem('favourites')).length; i++) {
    //     favouriteGifss.push(JSON.parse(localStorage.getItem('favourites'))[i]);
    // }
    // for (let i = 0; i < JSON.parse(localStorage.getItem('favouriteFromSearch')).length; i++) {
    //     favouriteGifss.push(JSON.parse(localStorage.getItem('favouriteFromSearch'))[i]);
    // }

    //forma 1a (original)

    // favouriteGifss = JSON.parse(localStorage.getItem('favourites')) || JSON.parse(localStorage.getItem('favouriteFromSearch'));
    // favouriteGifss += JSON.parse(localStorage.getItem('favouriteFromSearch'));

    //forma2

    // favouriteGifss = JSON.parse(localStorage.getItem('favourites')).concat(JSON.parse(localStorage.getItem('favouriteFromSearch')))

    // concat = función avanzada de js para concatenar arreglos.

    gifFavourites.innerHTML = '';
    for (let i = 0; i < favouriteGifss.length; i++) {
        let response  = await fetch (`https://api.giphy.com/v1/gifs/${favouriteGifss[i]}?api_key=${apiKey}`);
        let infoMyGif = await response.json ();
        renderViewFavouriteGifs(infoMyGif, i);

    }
}

getImagess();

function renderViewFavouriteGifs(info, i) {
    cardGifoFavourite = document.createElement('li');
    cardGifoFavourite.className = 'cardGifoFavourite';
    cardGifoFavourite.innerHTML = `<img src="${info.data.images.original.url}" alt="imagen gif">
    <div class="overlayFavourite">
        <div class="buttonsCardFavourite">
        <button class="trash" id="trash${i}"><img src="./assets/icon-trash-normal.svg" alt="borrar elemento"></button>
        <button class="download"><img src="./assets/icon-download.svg" alt="descargar"></button>
        <button class="superSize"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
        </div>
        <div class="infoTextGifs">
            <p>${info.data.username}</p>
            <p>${info.data.title}</p>
        </div>
    </div>`;
    gifFavourites.appendChild(cardGifoFavourite);

    let trash = document.getElementById(`trash${i}`);
    trash.addEventListener('click', () => {
        favouriteGifss.splice(i,1);
        localStorage.setItem('favourites', JSON.stringify(favouriteGifss));
        getImagess();
        // localStorage.removeItem('favourites', JSON.stringify(favouriteGifss[i]));
    })
}

// /* nocturne mode */

// function setUp () {
//     if (JSON.parse(localStorage.getItem('dark-mode'))){
//         console.log('modo nocturno está activado')
//         btnSwitch.innerHTML= 'MODO DIURNO';
//         imageLogo.setAttribute('src', './assets/logo-mobile-modo-noct.svg');
//         createGifs.setAttribute('src', './assets/CTA-crear-gifo-modo-noc.svg');
//         searchIcon.setAttribute('src', './assets/icon-search-mod-noc.svg');
//         arrowLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg');
//         arrowRight.setAttribute('src', './assets/button-slider-right-md-noct.svg');
//     }else{
//         console.log('modo nocturno está desactivado')
//     }
// }

// setUp();


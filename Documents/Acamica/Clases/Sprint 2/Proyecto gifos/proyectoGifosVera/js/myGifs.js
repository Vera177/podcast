let apiKey = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let gifSourcesMyOwnGif = document.getElementById('gifSourcesMyOwnGif');
let cardGifoMyOwnGif;
let createdGifs = [];
let imageMyOwnGif = document.getElementById('imageMyOwnGif');
let textMyOwnGif = document.getElementById('textMyOwnGif');
let showMore = document.getElementById('showMore');

async function getImages() {
    createdGifs = JSON.parse(localStorage.getItem('mygifs'));
    for (let i = 0; i < createdGifs.length; i++) {
        let response  = await fetch (`https://api.giphy.com/v1/gifs/${createdGifs[i]}?api_key=${apiKey}`);
        let infoMyGif = await response.json ();
        renderViewMyOwnGifs(infoMyGif);
    }
    // console.log(infoMyGif);
}

getImages();

function renderViewMyOwnGifs(info) {
    cardGifoMyOwnGif = document.createElement('li');
    cardGifoMyOwnGif.className = 'cardGifoMyOwnGif';
    cardGifoMyOwnGif.innerHTML = `<img src="${info.data.images.original.url}" alt="imagen gif">
    <div class="overlayMyOwnGif">
        <div class="buttonsCardMyOwnGif">
        <button class="trash"><img src="./assets/icon-trash-normal.svg" alt="borrar elemento"></button>
        <button class="download"><img src="./assets/icon-download.svg" alt="descargar"></button>
        <button class="superSize"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
        </div>
        <div class="infoTextGifs">
            <p>${info.data.username}</p>
            <p>${info.data.title}</p>
        </div>
    </div>`;
    gifSourcesMyOwnGif.appendChild(cardGifoMyOwnGif);
}

console.log(createdGifs)

if (createdGifs === 'null'){
    imageMyOwnGif.classList.add('MyGifsWithoutContent');
    textMyOwnGif.classList.add('MyGifsWithoutContent');
    showMore.classList.add('hideSomething');
}else{
    imageMyOwnGif.classList.add('hideTextAndImage');
    textMyOwnGif.classList.add('hideTextAndImage');
    showMore.classList.remove('hideSomething');
}
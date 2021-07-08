/* Search section */

let api_key = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let searchInput = document.getElementById('searchInput');
let searchIcon = document.getElementById('searchIcon');
let search;
let suggestions = [];


//suggestions search

searchInput.addEventListener('keyup', () => {
    search = searchInput.value;
    getSearchSuggestions(search);
});

async function getSearchSuggestions(input) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg&q=${input}&offset=0&rating=g&lang=en&limit=4`);
    suggestions = await response.json();
    filterSuggestions(suggestions, input);
}

function filterSuggestions(suggestions, input) {
    let results = [];
    if (input.length) {
        for (let i = 0; i < 4; i++) {
            results.push(suggestions.data[i].title);
        }
        results.filter((item) => {
            return item.toLowerCase().includes(input.toLowerCase());
        });
    }
    renderResults(suggestions, results, input);
}

function renderResults(suggestions, results, input) {

    let thinLineSuggestion = document.getElementById('thinLineSuggestion');

    let content = results.map((item) => {
        return `<li class="suggestionWord"><img class="searchSuggestionsMagnifyLens" src='./assets/icon-search-gray.svg'>${item}</li>`;
    }).join('');
    //how map method and return works. Look for that.
    resultsWrapper.innerHTML = `<ul id="resultUl">${content}</ul>`;

    if (input.length) {
        searchIcon.setAttribute('src', './assets/icon-search-gray.svg');
        thinLineSuggestion.className = 'lineGray';
    } else {
        searchIcon.setAttribute('src', './assets/icon-search.svg');
        thinLineSuggestion.className = '';
    }

    // results.forEach(function(test) {
    //     test.addEventListener ('click', function(e){
    //         // if (!e.target.matches(results)){
    //         //     return console.error(error);;
    //         // }else{
    //         let targetRender = e.target;
    //         console.log('Hola' + targetRender);
    //         // }
    //     });
    // });

    // results.forEach(clickk => clickk.addEventListener('click', (e) => {
    //     let input = this.target;
    //     console.log('Has introducido',e.data,'en el input',this.name);
    // }));

    // console.log(suggestions);


    let suggestionWordli = document.querySelectorAll('.suggestionWord');

    for (let i = 0; i < document.querySelectorAll('.suggestionWord').length; i++) {
        document.querySelectorAll('.suggestionWord')[i].addEventListener('click', () => {
            let contentSearch = suggestionWordli[i].textContent;  
            searchInput.value = contentSearch;
            search = searchInput.value;
            trending.className = 'none';
            showMore.className = 'showMore';
            titleSearch.className = 'titleSearchedGifs';
            thinLine.className = 'thinLine';
            searchIcon.setAttribute('src', './assets/close.svg')            
            inputSearch(search);
        });
    }
}

// event listener click
searchIcon.addEventListener('click', () => {
    search = searchInput.value;
    trending.className = 'none';
    showMore.className = 'showMore';
    titleSearch.className = 'titleSearchedGifs';
    thinLine.className = 'thinLine';
    searchIcon.setAttribute('src', './assets/close.svg')
    inputSearch(search);
});

async function inputSearch(search) {
    let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg&q=${search}&offset=0&rating=g&lang=en`)
    let info = await response.json();
    renderViewCardsSearch(info);
}

// renderization 

let gifCardsFounded = document.getElementById('gifCardsFounded');
let resultContainer = document.getElementById('resultContainer');
let titleSearch = document.getElementById('titleSearch');
let cardGifoFounded;
let ulContainer;
let thinLine = document.getElementById('thinLine');
let showMore = document.getElementById('showMore');
let initialPosition = 0;

async function renderViewCardsSearch(infoAPI) {

    let finalPosition = initialPosition + 12;

    if (initialPosition > finalPosition) {
        finalPosition = infoAPI.length;
    }

    titleSearch.innerHTML = search;

    for (i = initialPosition; i < finalPosition; i++) {
        console.log(initialPosition);
        cardGifoFounded = document.createElement('li');
        cardGifoFounded.className = 'cardGifoSearch';
        cardGifoFounded.innerHTML = `<img src="${infoAPI.data[i].images.original.url}" alt="imagen gif">
        <div class="overlayGifsSearch">
            <div class="buttonsCard">
            <button class="favourite" id="favouriteSearchBotton${[i]}"><img src="./assets/icon-fav.svg" alt="guardar favorito"></button>
            <button class="download" id="download"><img src="./assets/icon-download.svg" alt="descargar"></button>
            <button class="superSize" id="superSize"><img src="./assets/icon-max-normal.svg" alt="maximizar gif"></button>
            </div>
            <div class="infoTextGifs">
                <p>${infoAPI.data[i].username}</p>
                <p>${infoAPI.data[i].title}</p>
            </div>
        </div>`;
        gifCardsFounded.appendChild(cardGifoFounded);
        favouriteBottonAndSetStoragee(i, infoAPI);
    }

    showMore.addEventListener('click', () => {
        initialPosition = finalPosition;
        renderViewCardsSearch(infoAPI);
    });
}

//Favourite function

function favouriteBottonAndSetStoragee(i, info) {
    let favouriteBottons = document.getElementById(`favouriteSearchBotton${[i]}`);
    favouriteBottons.addEventListener('click', function () {
        favouriteGifs.push(info.data[i].id);
        localStorage.setItem('favourites', JSON.stringify(favouriteGifs));
    })
}

//Delete function

//Maximize function

//Download function

/* Trending searchs */

// let trending = document.getElementById('trending');
let trendingSearchs = document.getElementById('trendingSearchs');

async function getTrendingSearchs() {
    let response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg&limit=25&rating=g')
    let info = await response.json();
    trendingSearchs.innerHTML = `${info.data[0]}, ${info.data[1]}, ${info.data[2]}, ${info.data[3]}, ${info.data[4]}`;
}

getTrendingSearchs();

/* nocturne mode */

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

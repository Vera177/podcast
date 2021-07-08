let btnSwitch = document.getElementById('btnSwitch');
let imageLogo = document.getElementById('imageLogo');
// let searchIcon = document.getElementById('searchIcon');
// cross from searchIcon normal mode and nocturne mode
let createGifs = document.getElementById('createGifs');
//hamburguesa
let arrowLeft = document.getElementById('arrowLeft');
let arrowRight = document.getElementById('arrowRight');
// let searchIcon = 'null';
let fb = document.getElementById('fb');
let tw = document.getElementById('tw');
let ig = document.getElementById('ig');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
    
    if (document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true');
        changeIconDarkMode();  
    }else{
        localStorage.setItem('dark-mode', 'false');
        changeIconDayMode();
    }
})

/* Saving nocturne mode in all webpages, include when recharging page */

if(localStorage.getItem('dark-mode') === 'true') {
    document.body.classList.add('dark');
    changeIconDarkMode();  
}else {
    document.body.classList.remove('dark');
    changeIconDayMode();
}

/* change images */

function changeIconDarkMode () {
    btnSwitch.innerHTML= 'MODO DIURNO';
    imageLogo.setAttribute('src', './assets/logo-mobile-modo-noct.svg');
    createGifs.setAttribute('src', './assets/CTA-crear-gifo-modo-noc.svg');
    arrowLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg');
    arrowRight.setAttribute('src', './assets/button-slider-right-md-noct.svg');

    arrowLeft.addEventListener('mouseover', () => arrowLeft.setAttribute('src', './assets/button-slider-left-hover.svg'));
    arrowLeft.addEventListener('mouseout', () => arrowLeft.setAttribute('src', './assets/button-slider-left-md-noct.svg'));

    arrowRight.addEventListener('mouseover', () => arrowRight.setAttribute('src', './assets/Button-Slider-right-hover.svg'));
    arrowRight.addEventListener('mouseout', () => arrowRight.setAttribute('src', './assets/button-slider-right-md-noct.svg'));

    if (searchIcon != 'null') {
        searchIcon.setAttribute('src', './assets/icon-search-mod-noc.svg');
        searchIcon.addEventListener('click', () => 
        searchIcon.setAttribute('src', './assets/close-modo-noct.svg'));
    }
}

function changeIconDayMode () {
    btnSwitch.innerHTML= 'MODO NOCTURNO';
    imageLogo.setAttribute('src', './assets/logo-desktop.svg');
    createGifs.setAttribute('src', './assets/button-crear-gifo.svg');
    arrowLeft.setAttribute('src', './assets/button-slider-left.svg');
    arrowRight.setAttribute('src', './assets/Button-Slider-right.svg');
    if (searchIcon != 'null') {
        searchIcon.setAttribute('src', './assets/icon-search.svg');
        searchIcon.addEventListener('click', () => 
        searchIcon.setAttribute('src', './assets/close.svg'));
    }
    

    fb.addEventListener('mouseover', () => fb.setAttribute('src', './assets/icon_facebook_hover.svg'));
    fb.addEventListener('mouseout', () => fb.setAttribute('src', './assets/icon_facebook.svg'));

    tw.addEventListener('mouseover', () => tw.setAttribute('src', './assets/icon-twitter-hover.svg'));
    tw.addEventListener('mouseout', () => tw.setAttribute('src', './assets/icon-twitter.svg'));

    ig.addEventListener('mouseover', () => ig.setAttribute('src', './assets/icon_instagram-hover.svg'));
    ig.addEventListener('mouseout', () => ig.setAttribute('src', './assets/icon_instagram.svg'));

    arrowLeft.addEventListener('mouseover', () => arrowLeft.setAttribute('src', './assets/button-slider-left-hover.svg'));
    arrowLeft.addEventListener('mouseout', () => arrowLeft.setAttribute('src', './assets/button-slider-left.svg'));

    arrowRight.addEventListener('mouseover', () => arrowRight.setAttribute('src', './assets/Button-Slider-right-hover.svg'));
    arrowRight.addEventListener('mouseout', () => arrowRight.setAttribute('src', './assets/Button-Slider-right.svg'));


}

/* hover images */



createGifs.addEventListener('mouseover', () => createGifs.setAttribute('src', './assets/CTA-crear-gifo-hover.svg'));
createGifs.addEventListener('mouseout', () => createGifs.setAttribute('src', './assets/button-crear-gifo.svg'));

createGifs.addEventListener('click', () => createGifs.setAttribute('src', './assets/CTA-crear-gifo-active.svg'));
// no me toma el active :(


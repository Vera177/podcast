/* Create my own gifs */

/*buttons start/recording*/

let apiKey = 'np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg';
let recordButton = document.getElementById('start');
let titleCreateGifo = document.getElementById('titleCreateGifo');
let subtitleCreateGifo = document.getElementById('subtitleCreateGifo');
let video = document.getElementById('videoElement');
let imageRecording = document.getElementById('resultRecording');
let recorder;
let streaming;
let form = new FormData();
let myGifs = [];

/* check LocalStorage */

function loadStorage () {
  if (localStorage.getItem('mygifs')) {
    myGifs = JSON.parse(localStorage.getItem('mygifs'));
  }
}
loadStorage();

/*streaming*/

// separar por funciones(cambiar texto, getStreamAndRecord,), para así ir removiendo (removeEventListener) y agregando las funciones, desde los callbacks de las funciones.

recordButton.addEventListener('click', cameraAcces);

function cameraAcces () {
  titleCreateGifo.innerHTML = '¿Nos das acceso <br> a tu cámara?';
  subtitleCreateGifo.innerHTML = 'El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.';
  getStreamAndRecord();
}

function getStreamAndRecord () {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        titleCreateGifo.innerHTML = '';
        subtitleCreateGifo.innerHTML = '';
        video.classList.add('showVideo');
        video.srcObject = stream;
        video.play();
        streaming = stream;
        recordButton.innerHTML = 'GRABAR';
        passStreamValue();
      })
      .catch(function (err) {
        console.log("Something went wrong!");
      });
  }
}

function passStreamValue(){
  recordButton.removeEventListener('click', cameraAcces);
  recordButton.addEventListener('click', startRecording);
}

/*recording*/

function startRecording () {
    
    recorder = RecordRTC(streaming, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
       console.log('started')
       recordButton.innerHTML = 'FINALIZAR';
     },
      onGifPreview: function(gifURL) {
        imageRecording.src = gifURL;
      }
  });
  
  recorder.startRecording();
  recorder.camera = streaming;

  passValueRecorder(recorder);
}

function passValueRecorder(recorder){
  recordButton.removeEventListener('click', startRecording);
  recordButton.addEventListener('click', stopRecordingIntermidiate);
}

/* stop recording */

function stopRecordingIntermidiate(){
  recorder.stopRecording(stopRecordingCallback);
}

function stopRecordingCallback() {
  video.classList.remove('showVideo');
  imageRecording.classList.add('showSomething');
  imageRecording.src = URL.createObjectURL(recorder.getBlob());
  form.append('file', recorder.getBlob(), 'myGif.gif');
  // console.log(form.get('file'))
  recordButton.innerHTML = 'SUBIR GIFO';
  recorder.camera.stop();
  
  // recorder.destroy();
  // recorder = null;
 
  recordButton.removeEventListener('click', stopRecordingIntermidiate);
  recordButton.addEventListener('click', uploadgGif);
}

/*upload gif while rendering*/

function imageUploadingGif () {  
  //otro botón distinto con un class que sea show + .innerHTML = 'REPETIR CAPTURA';
  // Estamos subiendo tu GIFO = es un layout con el texto = "Estamos subiendo tu GIFO"
  //uploadingGif();
  //GIFO subido con éxito
}

function uploadgGif () {
  let send = fetch(`http://upload.giphy.com/v1/gifs?api_key=np4xYBCqbTJh3AtzJOzmHPfPPOJoafpg&file=${form}`, {method: 'POST', body: form});

  send.then(
    (sucess) => {
      return sucess.json()
    }
  ).then(
    (response) => {
      // console.log(response)
      // console.log(response.data.id);
      myGifs.push(response.data.id);
      localStorage.setItem('mygifs', JSON.stringify(myGifs));
      console.log('the gif has been uploaded!');
    }
  )
}
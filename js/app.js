import Api from './api/api.js';
import { getElement , templateTrack , getElements } from './helpers/helpers.js';
import { listaContainer , btnReproducir, reproductor , detalleSongsButtons
        , first , detalleCancion , detalleArtistaAlbum , imgPlay, imgTrackReproductor
        , loader , audioMp3 , play } from './helpers/constants.js';


let apiTrack = new Api();
let tracks = undefined;
let loaderDom = getElement(loader)
let lista = getElement(listaContainer);
let btnReproducirDom = getElement(btnReproducir);
let reproductorDom = getElement(reproductor);
let detalleSongsButtonsDom = getElements(detalleSongsButtons); 
let detalleCancionDom = getElement(detalleCancion);
let detalleArtistaAlbumDom = getElement(detalleArtistaAlbum);
let imgTrackReproductorDom = getElement(imgTrackReproductor);
let audioMp3Dom = getElement(audioMp3);
let playDom = getElement(play);

window.onload  = async () =>{
    tracks = await apiTrack.getInitialTracks();
    setTracks(tracks);
    let imgPlayDom = getElements(imgPlay);
    imgPlayDom.forEach(imgPlay => {
        imgPlay.addEventListener('click' , async () => {
           setReproductor(imgPlay);
        } )
    });
}

const setReproductor = (element) =>{
    let idTrack = element.getAttribute('track');
    showReproductor(idTrack);
}

const setTracks = (tracks) =>{
    loaderDom.style.display= "none";
    tracks.forEach(track => {
        lista.innerHTML+= setTrack(track)
    });
}

const setTrack = (track) =>{
    return templateTrack(track);
}

btnReproducirDom.addEventListener('click', async () =>{
   setReproductor(btnReproducirDom);
})


const setTrackReproductor = (track) =>{
    audioMp3Dom.setAttribute('src',track.preview);
    audioMp3Dom.play();
    playDom.classList.remove('fa-play-circle');
    playDom.classList.add('fa-pause-circle');
    imgTrackReproductorDom.setAttribute('src',track.album.cover_medium);
    detalleCancionDom.innerText = track.title;
    detalleArtistaAlbumDom.innerHTML = `${track.artist.name} - ${track.album.title}`
    reproductorDom.style.opacity = "1"
}

playDom.addEventListener('click' , () => {
    if(!audioMp3Dom.paused && !audioMp3Dom.ended){
        audioMp3Dom.pause();
        playDom.classList.remove('fa-pause-circle');
        playDom.classList.add('fa-play-circle');
    }else{
        audioMp3Dom.play();
        playDom.classList.remove('fa-play-circle');
        playDom.classList.add('fa-pause-circle');
    }
})

const showReproductor =  async (idTrack)  =>{
    reproductorDom.style.opacity ="0.75";
    reproductorDom.classList.add('click');
    let childs = Array.from(detalleSongsButtonsDom[first].children);
    let i = 0;
    childs.forEach(element => {
        i == 1 ? element.classList.add('fs-65') : element.classList.add('fs-35') ;
        i++;
    });
    let track = await apiTrack.getTrack(idTrack);
    setTrackReproductor(track);

}


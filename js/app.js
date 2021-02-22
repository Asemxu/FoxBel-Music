import Api from './api/api.js';
import { getElement , templateTrack , getElements , removeAdd} from './helpers/helpers.js';
import { listaContainer , btnReproducir, reproductor , detalleSongsButtons
        , first , detalleCancion , detalleArtistaAlbum , imgPlay, imgTrackReproductor
        , loader , audioMp3 , play , muted , volume} from './helpers/constants.js';


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
let mutedDom = getElement(muted);
let isMuted = false;
let volumeDom = getElement(volume);

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
    removeAdd(playDom,'fa-play-circle','fa-pause-circle');
    imgTrackReproductorDom.setAttribute('src',track.album.cover_medium);
    detalleCancionDom.innerText = track.title;
    detalleArtistaAlbumDom.innerHTML = `${track.artist.name} - ${track.album.title}`
    reproductorDom.style.opacity = "1"
}

playDom.addEventListener('click' , () => {
    if(!audioMp3Dom.paused && !audioMp3Dom.ended){
        audioMp3Dom.pause();
        removeAdd(playDom,'fa-pause-circle','fa-play-circle');
    }else{
        audioMp3Dom.play();
        removeAdd(playDom,'fa-play-circle','fa-pause-circle');
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

mutedDom.addEventListener('click', () =>{
    if(!isMuted){
        audioMp3Dom.muted = true;
        removeAdd(mutedDom,'fa-volume-off','fa-volume-mute');
        isMuted = true;
    }else{
        audioMp3Dom.muted = false 
        removeAdd(mutedDom,'fa-volume-muted','fa-volume-off');
        isMuted = false;
    }
})


volumeDom.addEventListener('input', () =>{
    let valueVolume = volumeDom.value;
    audioMp3Dom.volume = valueVolume; 
})

setInterval(() => {
    if(audioMp3Dom.ended){
        removeAdd(playDom,'fa-pause-circle','fa-play-circle');
    }
}, 300);
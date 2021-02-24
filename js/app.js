import Api from './api/api.js';
import { getElement , templateTrack , getElements , removeAdd} from './helpers/helpers.js';
import { listaContainer , btnReproducir, reproductor , detalleSongsButtons
        , first , detalleCancion , detalleArtistaAlbum , imgPlay, imgTrackReproductor
        , loader , audioMp3 , play , muted , volume , trackSearch , coincidenciasText
        , next , previous } from './helpers/constants.js';

//Inicializamos la Api
let apiTrack = new Api();


// establecemos los valores en undefined
let initialTracks = undefined;
let searchData = undefined;
let trackPlay = undefined;
let isMuted = false;


//obtenemos los elementos del dom
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
let volumeDom = getElement(volume);
let trackSearchDom = getElement(trackSearch);
let coincidenciasTextDom = getElement(coincidenciasText);
let previousDoom = getElement(previous);
let nextDom = getElement(next);

window.onload  = async () =>{
    await searchTracks();
    setImgPlayTracks();
}

const setImgPlayTracks = () =>{
    let imgPlayDom = getElements(imgPlay);
    imgPlayDom.forEach(imgPlay => {
        imgPlay.addEventListener('click' , async () => {
           setReproductor(imgPlay);
        } )
    });
}

const searchTracks = async () =>{
    initialTracks = await apiTrack.getInitialTracks();
    // setPosition();
    setTracks(initialTracks);
}

// const setPosition = () =>{
//     for(let i = 0; i < initialTracks.length ; i++){
//         initialTracks[i] = {...initialTracks[i],'position':i};
//     }
//     console.log(initialTracks);
// }

trackSearchDom.addEventListener('keyup',  async () =>{
    lista.innerHTML = "";
    let searchValue = trackSearchDom.value;
    if(searchValue !== ''){
       searchData =  await apiTrack.getSearchData(searchValue);
       coincidenciasTextDom.innerText = `N° de coincidencias encontradas: ${searchData.total}`;
       searchData = searchData.data;
        // console.log(searchData);
        setTracks(searchData);
        setImgPlayTracks();
    }else{
        coincidenciasTextDom.innerText = "Búsqueda";
        setTracks(initialTracks);
        setImgPlayTracks();
    }
})

const setReproductor = (element) =>{
    let idTrack = element.getAttribute('track');
    showReproductor(idTrack,initialTracks);
}

const setTracks = (tracks) =>{
    loaderDom.style.display= "none";
    tracks.forEach(track => {
        lista.innerHTML+= setTrack(track)
    });
    trackSearchDom.removeAttribute('disabled');
}

const setTrack = (track) =>{
    return templateTrack(track);
}

btnReproducirDom.addEventListener('click', async () =>{
   setReproductor(btnReproducirDom);
})


const setTrackReproductor = () =>{
    audioMp3Dom.setAttribute('src',trackPlay.song);
    audioMp3Dom.play();
    removeAdd(playDom,'fa-play-circle','fa-pause-circle');
    imgTrackReproductorDom.setAttribute('src',trackPlay.imagen);
    detalleCancionDom.innerText = trackPlay.title;
    detalleArtistaAlbumDom.innerHTML = `${trackPlay.artista} - ${trackPlay.albm}`
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

    let trackSearch  = trackSearchDom.value === '' ?  initialTracks.filter( trackArray => trackArray.id == idTrack) : searchData.filter( trackArray => trackArray.id == idTrack);
    trackPlay = trackSearch[first];
    // console.log(trackPlay);
    // let track = await apiTrack.getTrack(idTrack);
    setTrackReproductor(trackPlay);

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
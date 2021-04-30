import Api from './api/api.js';
import { getElement , templateTrack , getElements , removeAdd} from './helpers/helpers.js';
import { listaContainer , btnReproducir, reproductor , detalleSongsButtons
        , first , detalleCancion , detalleArtistaAlbum , imgPlay, imgTrackReproductor
        , loader , audioMp3 , play , muted , volume , trackSearch , coincidenciasText
        , next , previous , headerMain , navContainer , loaderContainer
        , calc} from './helpers/constants.js';

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
let headerMainDom = getElement(headerMain);
let loaderContainerDom = getElement(loaderContainer);
let navContainerDom = getElement(navContainer);
let previousDoom = getElement(previous);
let nextDom = getElement(next);

window.onload  = async () =>{
    await searchTracks();
    navContainerDom.style.height = calc;
    lista.style.height="1300px";
    loaderContainerDom.style.height = calc;
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

window.addEventListener('scroll',() =>{
    let scroll = document.documentElement.scrollTop;
    if(scroll > 70)
        headerMainDom.classList.add('scroll-fixed');
    else
        headerMainDom.classList.remove('scroll-fixed');

})

window.onscroll = () =>{
}
// const setPosition = () =>{
//     for(let i = 0; i < initialTracks.length ; i++){
//         initialTracks[i] = {...initialTracks[i],'position':i};
//     }
//     console.log(initialTracks);
// }

trackSearchDom.addEventListener('keyup',  async () =>{
    lista.innerHTML = "";
    loaderContainerDom.style.display="flex";
    IsEmpty(trackSearchDom.value);
})


const IsEmpty = async  (value) =>{
    if(value !== ''){
        searchData =  await apiTrack.getSearchData(value);
        
        coincidenciasTextDom.innerText = `N° de coincidencias encontradas: ${searchData.total}`;
        loaderContainerDom.style.display="none";
         setTracksDom(searchData.data);
     }else{
         coincidenciasTextDom.innerText = "Búsqueda";
         setTracksDom(initialTracks)
     }
}

const setTracksDom = (data) =>{
    setTracks(data);
    setImgPlayTracks();
}

const setReproductor = (element) =>{
    let idTrack = element.getAttribute('track');
    showReproductor(idTrack,);
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
    detalleCancionDom.innerText = trackPlay.name;
    detalleArtistaAlbumDom.innerHTML = `${trackPlay.artista} - ${trackPlay.album}`
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
    for(let i = 0; i <childs.length ; i++)
        i == 1 ? childs[i].classList.add('fs-65') : childs[i].classList.add('fs-35') ;
    let trackSearch  = trackSearchDom.value === '' ?  initialTracks.filter( trackArray => trackArray.id == idTrack) : searchData.data.filter( trackArray => trackArray.id == idTrack);
    trackPlay = trackSearch[first];
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



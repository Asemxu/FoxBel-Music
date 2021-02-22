import { urlApi , optionsApi} from '../helpers/env.js';
import { getTrackList , getTrack } from '../helpers/query.js';
import { first , initialQuery } from '../helpers/constants.js';
import { getObject } from '../helpers/helpers.js';

class Api{
    constructor(){
        this.getInitialTracks =  async () =>{
            let initialTracks = [];
            let  cantidadTracksShow = 20;
            for(let i = 1; i <= cantidadTracksShow ; i++){
                let song = await this.#executeQuery(getTrackList(i),initialQuery);
                
                song !== undefined ? initialTracks.push(getObject(song)) : "";
            } 
            return initialTracks;
        }

        this.getTrack = async (idTrack) =>{
            let track = await this.#executeQuery(getTrack(idTrack),undefined);
            return track;
        }
    }

    #executeQuery = async (query ,type) =>{
        let response = await fetch(`${urlApi}${query}`,optionsApi);
        let data = await response.json();
        return type === initialQuery ?   data.data[first] : data;
    }
}


export default Api;
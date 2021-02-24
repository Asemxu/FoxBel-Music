import { urlApi , optionsApi} from '../helpers/env.js';
import { getTrackList , getTrack , getSearch } from '../helpers/query.js';
import { first , queryData , querySearch} from '../helpers/constants.js';
import { getObject } from '../helpers/helpers.js';

class Api{
    constructor(){
        this.getInitialTracks =  async () =>{
            let initialTracks = [];
            let  cantidadTracksShow = 28;
            for(let i = 1; i <= cantidadTracksShow ; i++){
                let song = await this.#executeQuery(getTrackList(i) ,queryData);
                song !== undefined ? initialTracks.push(getObject(song)) : "";
            } 
            return initialTracks;
        }

        this.getTrack = async (idTrack) =>{
            let track = await this.#executeQuery(getTrack(idTrack),undefined);
            return track;
        }

        this.getSearchData = async (searchText) =>{
            let searchData = await this.#executeQuery(getSearch(searchText) ,querySearch);
            let searchDataParse = [];
            searchData.data.forEach(track => {
                searchDataParse.push(getObject(track))
            });
            return { data : searchDataParse , total :searchData.total };
        }
    }

    #executeQuery = async (query ,type) =>{
        let response = await fetch(`${urlApi}${query}`,optionsApi);
        let data = await response.json();
        return type === queryData ?   data.data[first] :  type === querySearch  ?  { data : data.data , total : data.total } : data;
    }
}


export default Api;
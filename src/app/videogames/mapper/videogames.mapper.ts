import { Videogames } from "../interfaces/videogames.interface";
import { RESTVideogames } from "../interfaces/videogamesResponse";


export class VideogamesMapper {
  static mapVideogameItem(item: RESTVideogames): Videogames {
    return {
      id: item.id,
      nombre: item.nombre,
      genero: item.genero,
      consolas: item.consolas,
      puntuacion_metacritic: item.puntuacion_metacritic,
      anio: item.anio,
      imagen: item.imagen,
      sinopsis: item.sinopsis,

    }
  }

  static mapVideogameItemsToVideogameArray(items: RESTVideogames[]): Videogames[] {
    return items.map(this.mapVideogameItem);
  }

  static mapMovieItemToMovie(item: RESTVideogames): Videogames {
    return {
      id: item.id,
      nombre: item.nombre,
      genero: item.genero,
      consolas: item.consolas,
      puntuacion_metacritic: item.puntuacion_metacritic,
      anio: item.anio,
      imagen: item.imagen,
      sinopsis: item.sinopsis,

    };
  }

}

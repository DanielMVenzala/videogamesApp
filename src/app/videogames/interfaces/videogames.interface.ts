import { Consola } from "./videogamesResponse";

export interface Videogames {
    id:                    string;
    nombre:                string;
    genero:                string;
    consolas:              Consola[];
    puntuacion_metacritic: number;
    anio:                   number;
    imagen:                 string;
    sinopsis:              string;
}

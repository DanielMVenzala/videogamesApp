export interface RESTVideogames {
  id:                    string;
  nombre:                string;
  genero:                string;
  consolas:              Consola[];
  puntuacion_metacritic: number;
  anio:       number;
  imagen:       string;
  sinopsis:              string;
}

export enum Consola {
  NintendoSwitch = "Nintendo Switch",
  PC = "PC",
  Ps4 = "PS4",
  Ps5 = "PS5",
  WiiU = "Wii U",
  XboxOne = "Xbox One",
  XboxSeriesXS = "Xbox Series X/S",
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RESTVideogames } from '../interfaces/videogamesResponse';
import { Videogames } from '../interfaces/videogames.interface';

@Injectable({ providedIn: 'root' })
export class VideogamesService {

  private api = 'http://localhost:3000/videogames';

  constructor(private http: HttpClient) {}

  getPaginatedVideogames(page: number = 1, limit: number = 6): Observable<RESTVideogames[]> {
    return this.http.get<RESTVideogames[]>(this.api, {
      params: {
        _page: page,
        _limit: limit
      }
    });
  }

  getAllVideogames(): Observable<RESTVideogames[]> {
    return this.http.get<RESTVideogames[]>(this.api);
  }

  getVideogame(id: number): Observable<RESTVideogames> {
    return this.http.get<RESTVideogames>(`${this.api}/${id}`);
  }

  addVideogame(vg: any): Observable<any> {
    return this.http.post<any>(this.api, vg);
  }

  updateVideogame(videogame: Videogames): Observable<any> {
    return this.http.put(`${this.api}/${videogame.id}`, videogame);
  }

  deleteVideogame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

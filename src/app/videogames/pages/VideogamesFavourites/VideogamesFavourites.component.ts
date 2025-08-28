import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RESTVideogames } from '../../interfaces/videogamesResponse';


import { CommonModule, SlicePipe } from '@angular/common';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { VideogamesService } from '../../services/Videogames.service';

@Component({
  selector: 'app-videogames-favourites',
  imports: [CommonModule, SlicePipe],
  templateUrl: './VideogamesFavourites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideogamesFavouritesComponent implements OnInit {

  favourites$: Observable<RESTVideogames[]> = of([]);

  constructor(
    private videogamesService: VideogamesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.favourites$ = this.videogamesService.getAllVideogames().pipe(
      map(games => {
        const favIds = this.authService.getFavorites();
        return games.filter(g => favIds.includes(Number(g.id)));


      })
    );
  }

  deleteVideogame(id: number) {
    if (confirm('¿Estás seguro que quieres eliminar este juego de favoritos?')) {
      this.authService.removeFavorite(id).subscribe(() => {
        // Forzar recarga de favoritos
        this.favourites$ = this.videogamesService.getAllVideogames().pipe(
          map(games => {
            const favIds = this.authService.getFavorites();
            return games.filter(g => favIds.includes(Number(g.id)));


          })
        );
      });
    }
  }
}

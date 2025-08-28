import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RESTVideogames } from '../../interfaces/videogamesResponse';
import { VideogamesService } from '../../services/Videogames.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { TopMenuComponent } from "../../../shared/components/top-menu/top-menu.component";
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-videogames-list',
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    NgxPaginationModule
  ],
  templateUrl: './VideogamesList.component.html',
})
export class VideogamesListComponent implements OnInit {
  videogames: RESTVideogames[] = [];
  public page!: number;
  authService = inject(AuthService);

  constructor(private videogamesService: VideogamesService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadVideogames()
  }

  addToFavourites(videogameId: number) {
  if (confirm('¿Quieres añadir este juego a favoritos?')) {
    this.authService.addFavorite(videogameId).subscribe({
      next: (updatedUser) => {
        console.log('Favorito añadido:', updatedUser);
      },
      error: (err) => {
        console.error('Error al añadir favorito:', err);
      }
    });
  }
}


  loadVideogames() {
    this.videogamesService.getAllVideogames().subscribe({
    next: (data) => {
      console.log('Videojuegos: ', data);
      this.videogames = data;
      this.cd.detectChanges();

    },
    error: (err) => console.error('Error fetching videogames:', err)
  });
  }

  deleteVideogame(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este videojuego?')) {
      this.videogamesService.deleteVideogame(id).subscribe({
        next: () => {
          console.log('Videojuego eliminado');
          this.loadVideogames(); // Vuelve a cargar la lista actualizada
        },
        error: (err) => {
          console.error('Error al eliminar el videojuego:', err);
        }
      });
    }
  }




 }

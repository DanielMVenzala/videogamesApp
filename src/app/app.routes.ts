import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/components/HomePage/HomePage.component';
import { VideogamesListComponent } from './videogames/pages/VideogamesList/VideogamesList.component';
import { EditPageComponent } from './videogames/pages/edit-page/edit-page.component';
import { VideogamesFavouritesComponent } from './videogames/pages/VideogamesFavourites/VideogamesFavourites.component';
import { VideogamesLayoutComponent } from './videogames/layout/VideogamesLayout/VideogamesLayout.component';
import { InfoPageComponent } from './videogames/pages/InfoPage/InfoPage.component';
import { authGuard } from './auth/guards/auth.guard';
import { NewVideogameComponent } from './videogames/pages/newVideogame/newVideogame.component';


export const routes: Routes = [
  // Ruta raiz
  {
    path: '',
    component: HomePageComponent,
  },

  // Layout común para las demás páginas
  {
    path: '',
    component: VideogamesLayoutComponent,  // Este tiene el <router-outlet> y el menú
    children: [
      {
        path: 'list',
        component: VideogamesListComponent,
      },
      {
        path: 'favourites',
        component: VideogamesFavouritesComponent,
        canActivate: [authGuard]
      },
      {
        path: 'new',
        component: NewVideogameComponent,
        canActivate: [authGuard]
      },
      {
        path: 'edit/:id',
        component: EditPageComponent,
        canActivate: [authGuard]
      },
      {
        path: 'info/:id',
        component: InfoPageComponent
      },

      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes')
      },




    ]
  },

  // Redirección por defecto
  {
    path: '**',
    redirectTo: '',
  }
];


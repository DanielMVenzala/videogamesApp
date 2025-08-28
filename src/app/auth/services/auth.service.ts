import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

interface User {
  id: number;
  email: string;
  password: string;
  nombre: string;
  favoritos: number[];

}

@Injectable({ providedIn: 'root' })

  export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3001';

  private _user = signal<User | null>(this.loadUserFromStorage());

  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly currentUser = this._user.asReadonly();

  private loadUserFromStorage(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`).pipe(
      map(users => users.length ? users[0] : null),
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this._user.set(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this._user.set(null);
  }

  getUser(): User | null {
    return this._user();
  }

  getFavorites(): number[] {
    return this._user()?.favoritos ?? [];
  }

  addFavorite(gameId: number): Observable<User | null> {
  const user = this._user();
  if (!user) return new Observable(subscriber => subscriber.complete());

  const favoritos = new Set(user.favoritos ?? []);
  favoritos.add(gameId);

  return this.updateFavoritos(Array.from(favoritos));
}

removeFavorite(gameId: number): Observable<User | null> {
  const user = this._user();
  if (!user) return new Observable(subscriber => subscriber.complete());

  const favoritos = (user.favoritos ?? []).filter(id => id !== gameId);

  return this.updateFavoritos(favoritos);
}

private updateFavoritos(favoritos: number[]): Observable<User | null> {
  const user = this._user();
  if (!user) return new Observable(subscriber => subscriber.complete());

  const updatedUser = { ...user, favoritos };

  return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, { favoritos }).pipe(
    tap(() => {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this._user.set(updatedUser);
    }),
    map(() => updatedUser)
  );
}



  // private updateFavorites(favorites: number[]): Observable<User | null> {
  //   const user = this._user();
  //   if (!user) return new Observable(subscriber => subscriber.complete());


  //   return this.http.patch<User>(`${this.baseUrl}/users/${user.email}`, { favorites }).pipe(
  //     tap(updatedUser => {
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //       this._user.set(updatedUser);
  //     }),
  //     map(updatedUser => updatedUser)
  //   );
  // }
}

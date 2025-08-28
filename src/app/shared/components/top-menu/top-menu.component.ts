import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'top-menu',
  imports: [RouterLink],
  templateUrl: './top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {


  userName = signal<string | null>(null);

  constructor(public authService: AuthService) {
    effect(() => {
      const user = this.authService.currentUser();
      this.userName.set(user?.nombre ?? null);
    });
  }
 }

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showError();
      return;
    }

    const email = this.loginForm.get('email')?.value as string;
    const password = this.loginForm.get('password')?.value as string;

    this.isPosting.set(true);

    this.authService.login(email, password).subscribe(user => {
      this.isPosting.set(false);
      if (user) {
        this.router.navigate(['/list']);
      } else {
        this.showError();
      }
    });
  }

  private showError() {
    this.hasError.set(true);
    setTimeout(() => this.hasError.set(false), 2000);
  }
}

import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { TitleHeader } from '../../../../shared/components/title-header/title-header';
import { PageWrapper } from '../../../../shared/wrappers/page-wrapper/page-wrapper';

@Component({
  selector: 'app-login',
  imports: [TitleHeader, PageWrapper, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private fb = inject(NonNullableFormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router);
  private snackbarService = inject(SnackbarService)

  loginForm = this.fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })

  get email() {
    return this.loginForm.get("email")
  }

  get password() {
    return this.loginForm.get("password")
  }

  submit() {
    const { email, password } = this.loginForm.value

    if (!this.loginForm.valid || !email || !password) {
      this.snackbarService.show("Formulario incorrecto", "error")
    }
    if (this.loginForm.valid && email && password) {
      this.authService.login(email as string, password as string).subscribe({
        next: () => {
          this.snackbarService.show("Se ha iniciado sesión correctamente", "success");
          const redirect = this.router.parseUrl(this.router.url).queryParams?.['redirect'];
          this.router.navigateByUrl(redirect || '/offers');
        },
        error: () => {
          this.snackbarService.show("Usuario o contraseña incorrectos", "error");
        }
      });
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth-service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { TitleHeader } from '../../../../shared/components/title-header/title-header';

@Component({
  selector: 'app-register',
  imports: [TitleHeader, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private fb = inject(NonNullableFormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)
  private snackbarService = inject(SnackbarService)

  registerForm = this.fb.group({
    userName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.min(6)]),
    confirmPassword: new FormControl("", Validators.required)
  })

  get userName() {
    return this.registerForm.get("userName")
  }

  get email() {
    return this.registerForm.get("email")
  }

  get password() {
    return this.registerForm.get("password")
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword")
  }

  submit() {
    const { userName, email, password, confirmPassword } = this.registerForm.value

    if (!this.registerForm.valid || !email || !password || !userName || !confirmPassword) {
      this.snackbarService.show("Formulario incorrecto", "error")
    }

    if (this.registerForm.valid && userName && email && password && confirmPassword && password === confirmPassword) {
      this.authService.register(userName, email, password).subscribe({
        next: () => {
          this.snackbarService.show("Te has registrado con éxito", "success")
          this.router.navigate(["dashboard"])
        },
        error: (err) => {
          this.snackbarService.show(`¡Ups!, ha habido un problema ${err}`, "error")
        }
      })
    }


  }
}

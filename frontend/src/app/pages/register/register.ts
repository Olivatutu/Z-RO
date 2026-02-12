import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  msg = '';
  loading = false;

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get f() { return this.form.controls; }

  submit() {
    this.msg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg = 'Revisa los campos.';
      return;
    }

    this.loading = true;
    const dto = this.form.getRawValue();

    this.auth.register(dto).pipe(
      switchMap(() => this.auth.login({ username: dto.username, password: dto.password })),
      finalize(() => this.loading = false)
    ).subscribe({
      next: () => this.router.navigateByUrl('/register-step2'),
      error: (err) => {
        const data = err?.error;
        if (data?.username) this.msg = data.username[0];
        else if (data?.email) this.msg = data.email[0];
        else if (data?.password) this.msg = data.password[0];
        else this.msg = 'No se pudo crear la cuenta.';
      }
    });
  }
}

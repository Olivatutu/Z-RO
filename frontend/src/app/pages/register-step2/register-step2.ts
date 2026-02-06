import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ProfileService, InterestKey } from '../../core/profile.service';

@Component({
  selector: 'app-register-step2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-step2.html',
  styleUrls: ['./register-step2.scss'],
})
export class RegisterStep2Component {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private profiles = inject(ProfileService);

  msg = '';
  loading = false;

  interestsList: { key: InterestKey; label: string }[] = [
    { key: 'sport', label: 'Sport' },
    { key: 'food', label: 'Food' },
    { key: 'mindset', label: 'Mindset' },
    { key: 'growth', label: 'Growth' },
    { key: 'challenges', label: 'Challenges' },
  ];

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    weeklyGoal: [4, [Validators.required, Validators.min(1), Validators.max(14)]],
    interests: this.fb.nonNullable.group({
      sport: [true],
      food: [false],
      mindset: [false],
      growth: [true],
      challenges: [false],
    }),
  });

  constructor() {
    if (!this.auth.isLogged()) this.router.navigateByUrl('/login');
    const local = this.profiles.getLocal();
    if (local) {
      this.form.patchValue({
        fullName: local.fullName,
        weeklyGoal: local.weeklyGoal,
        interests: {
          sport: local.interests.includes('sport'),
          food: local.interests.includes('food'),
          mindset: local.interests.includes('mindset'),
          growth: local.interests.includes('growth'),
          challenges: local.interests.includes('challenges'),
        }
      });
    }
  }

  private collectInterests(): InterestKey[] {
    const v = this.form.getRawValue().interests;
    return Object.entries(v).filter(([, on]) => on).map(([k]) => k as InterestKey);
  }

  submit() {
    this.msg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg = 'Completa los campos.';
      return;
    }

    this.loading = true;
    const dto = {
      fullName: this.form.getRawValue().fullName,
      weeklyGoal: this.form.getRawValue().weeklyGoal,
      interests: this.collectInterests(),
    };

    this.profiles.saveProfile(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.loading = false;
        this.profiles.setLocal(dto);
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ProfileService, ProfileDTO, UnitSystem } from '../../core/profile.service';

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

  interestsList = [
    { key: 'sport', label: 'Sport' },
    { key: 'food', label: 'Food' },
    { key: 'mindset', label: 'Mindset' },
    { key: 'growth', label: 'Growth' },
    { key: 'challenges', label: 'Challenges' },
  ] as const;

  form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    weeklyGoal: [4, [Validators.required, Validators.min(1), Validators.max(14)]],
    unitSystem: ['metric' as UnitSystem, [Validators.required]],
    interests: this.fb.nonNullable.group({
      sport: [true],
      food: [false],
      mindset: [false],
      growth: [true],
      challenges: [false],
    }),
  });

  constructor() {
    if (!this.auth.isLogged()) {
      this.router.navigateByUrl('/login');
      return;
    }

    const local = this.profiles.getLocal();

    if (local) {
      this.form.patchValue({
        fullName: local.full_name ?? '',
        weeklyGoal: local.weekly_goal ?? 4,
        unitSystem: (local.unit_system ?? 'metric') as UnitSystem,
        interests: {
          sport: !!local.sport,
          food: !!local.food,
          mindset: !!local.mindset,
          growth: !!local.growth,
          challenges: !!local.challenges,
        },
      });
    }
  }

  private buildDto(): ProfileDTO {
    const v = this.form.getRawValue();

    return {
      full_name: v.fullName,
      weekly_goal: v.weeklyGoal,
      unit_system: v.unitSystem,
      sport: v.interests.sport,
      food: v.interests.food,
      mindset: v.interests.mindset,
      growth: v.interests.growth,
      challenges: v.interests.challenges,
    };
  }

  submit() {
    this.msg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg = 'Completa los campos.';
      return;
    }

    this.loading = true;
    const dto = this.buildDto();

    this.profiles.setLocal(dto);

    this.profiles.saveProfile(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
      },
    });
  }
}

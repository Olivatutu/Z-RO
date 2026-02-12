import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService, ProfileDTO } from '../../core/profile.service';
import { ProgressChartComponent } from "../shared/progress-chart/progress-chart.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressChartComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  private profiles = inject(ProfileService);

  name = 'User';
  weeklyGoal = 3;

  focus: { key: keyof ProfileDTO; label: string; link: string }[] = [];
  loadingProfile = true;

  constructor() {
    const local = this.profiles.getLocal();
    if (local) this.applyProfile(local);

    this.profiles.getProfile().subscribe({
      next: (p) => {
        this.applyProfile(p);
        this.loadingProfile = false;
      },
      error: () => {
        this.loadingProfile = false;
      }
    });
  }

  private applyProfile(p: ProfileDTO) {
    this.name = p.full_name || 'User';
    this.weeklyGoal = p.weekly_goal || 3;

    const items: { key: keyof ProfileDTO; label: string; link: string }[] = [
      { key: 'sport', label: 'Sport', link: '/sport' },
      { key: 'food', label: 'Food', link: '/food' },
      { key: 'mindset', label: 'Mindset', link: '/mindset' },
      { key: 'growth', label: 'Growth', link: '/growth' },
      { key: 'challenges', label: 'Challenges', link: '/challenges' },
    ];

    const selected = items.filter(i => (p[i.key] as any) === true);
    this.focus = selected.length ? selected : items.slice(0, 3);
  }
}

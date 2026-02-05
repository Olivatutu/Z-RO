import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  fullName = '...';
  loading = true;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.profile().subscribe({
      next: (res: any) => {
        this.fullName = res.full_name || 'User';
        this.loading = false;
      },
      error: () => {
        this.auth.logout();
        this.router.navigateByUrl('/login');
      }
    });
  }
}

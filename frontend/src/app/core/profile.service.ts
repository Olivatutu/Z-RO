import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { tap } from 'rxjs/operators';

export type InterestKey = 'sport' | 'food' | 'mindset' | 'growth' | 'challenges';

export type ProfileDTO = {
  fullName: string;
  weeklyGoal: number;
  interests: InterestKey[];
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private key = 'zero_profile';

  constructor(private http: HttpClient) {}

  getLocal(): ProfileDTO | null {
    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    try { return JSON.parse(raw) as ProfileDTO; } catch { return null; }
  }

  setLocal(p: ProfileDTO) {
    localStorage.setItem(this.key, JSON.stringify(p));
  }

  saveProfile(p: ProfileDTO) {
    return this.http.post(`${environment.apiUrl}/api/accounts/profile/`, p).pipe(
      tap(() => this.setLocal(p))
    );
  }
}

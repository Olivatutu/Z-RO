import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { tap } from 'rxjs/operators';

export type UnitSystem = 'metric' | 'imperial';

export type ProfileDTO = {
  full_name: string;
  weekly_goal: number;
  unit_system: UnitSystem;
  sport: boolean;
  food: boolean;
  mindset: boolean;
  growth: boolean;
  challenges: boolean;
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

  getProfile() {
    return this.http.get<ProfileDTO>(`${environment.apiUrl}/api/accounts/profile/`).pipe(
      tap(p => this.setLocal(p))
    );
  }

  saveProfile(p: ProfileDTO) {
    return this.http.post<ProfileDTO>(`${environment.apiUrl}/api/accounts/profile/`, p).pipe(
      tap(saved => this.setLocal(saved))
    );
  }
}

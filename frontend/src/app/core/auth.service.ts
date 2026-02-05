import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { tap } from 'rxjs/operators';

type LoginResponse = { access: string; refresh: string };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) {}

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.base}/register/`, data);
  }

  login(data: { username: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.base}/login/`, data).pipe(
      tap((res) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
      })
    );
  }

  profile() {
    return this.http.get(`${this.base}/profile/`);
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  get token(): string | null {
    return localStorage.getItem('access');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }
}

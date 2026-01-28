import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
  player?: {
    id: number;
    username: string;
    email: string;
    player_name: string;
    credits: number;
    start_system_choice?: string;
    last_environment?: string;
  };
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  player_name: string;
  credits: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  currentUser = signal<UserData | null>(null);
  isLoggedIn = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loadStoredAuth();
  }

  login(emailOrUsername: string, password: string) {
    const request: LoginRequest = {
      email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
      username: emailOrUsername.includes('@') ? undefined : emailOrUsername,
      password
    };
    return this.http.post<LoginResponse>(`${environment.authApiUrl}/auth/login`, request);
  }

  storeAuth(token: string, user: UserData) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private loadStoredAuth() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userJson = localStorage.getItem(this.USER_KEY);

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUser.set(user);
        this.isLoggedIn.set(true);
      } catch (e) {
        this.clearAuth();
      }
    }
  }

  private clearAuth() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
  }
}

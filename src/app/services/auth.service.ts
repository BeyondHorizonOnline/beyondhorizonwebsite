import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(emailOrUsername: string, password: string) {
    const request: LoginRequest = {
      email: emailOrUsername.includes('@') ? emailOrUsername : undefined,
      username: emailOrUsername.includes('@') ? undefined : emailOrUsername,
      password
    };
    return this.http.post<LoginResponse>(`${environment.authApiUrl}/auth/login`, request);
  }
}

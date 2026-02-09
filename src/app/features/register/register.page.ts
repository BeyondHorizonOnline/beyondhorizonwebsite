import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonInput, IonIcon, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { eye, eyeOff } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [IonContent, IonInput, IonIcon, IonSpinner, StarfieldBackgroundComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  username = signal('');
  email = signal('');
  password = signal('');
  playerName = signal('');
  showPassword = signal(false);

  usernameError = signal<string | null>(null);
  emailError = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  playerNameError = signal<string | null>(null);
  serverError = signal<string | null>(null);

  isSubmitting = signal(false);

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {
    addIcons({ eye, eyeOff });
  }

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  clearError(field: string) {
    this.serverError.set(null);
    switch (field) {
      case 'username': this.usernameError.set(null); break;
      case 'email': this.emailError.set(null); break;
      case 'password': this.passwordError.set(null); break;
      case 'playerName': this.playerNameError.set(null); break;
    }
  }

  async submit(event: Event) {
    event.preventDefault();

    const username = this.username().trim();
    const email = this.email().trim();
    const password = this.password();
    const playerName = this.playerName().trim();

    // Clear all errors
    this.usernameError.set(null);
    this.emailError.set(null);
    this.passwordError.set(null);
    this.playerNameError.set(null);
    this.serverError.set(null);

    // Validate
    let hasError = false;

    if (!username) {
      this.usernameError.set('Username is required');
      hasError = true;
    } else if (username.length < 3) {
      this.usernameError.set('Username must be at least 3 characters');
      hasError = true;
    }

    if (!email) {
      this.emailError.set('Email is required');
      hasError = true;
    } else if (!this.isValidEmail(email)) {
      this.emailError.set('Invalid email format');
      hasError = true;
    }

    if (!password) {
      this.passwordError.set('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      this.passwordError.set('Password must be at least 6 characters');
      hasError = true;
    }

    if (!playerName) {
      this.playerNameError.set('Player name is required');
      hasError = true;
    } else if (playerName.length < 3) {
      this.playerNameError.set('Player name must be at least 3 characters');
      hasError = true;
    }

    if (hasError) return;

    this.isSubmitting.set(true);

    try {
      const response = await firstValueFrom(
        this.authService.register(username, email, password, playerName)
      );

      if (response?.success) {
        await this.showToast('Account created! Please sign in.');
        await this.router.navigate(['/login']);
      } else {
        this.serverError.set(response?.error || 'Registration failed');
      }
    } catch (error: any) {
      const msg = error?.error?.error || 'Registration failed. Please try again.';
      this.serverError.set(msg);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}

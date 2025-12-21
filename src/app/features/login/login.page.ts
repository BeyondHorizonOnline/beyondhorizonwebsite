// File: src/app/features/login/login.page.ts
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonInput, IonCheckbox, IonIcon, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { StarfieldBackgroundComponent } from '../../components/starfield-background/starfield-background.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { eye, eyeOff } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonContent, IonInput, IonCheckbox, IonIcon, IonSpinner, StarfieldBackgroundComponent, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  showPassword = signal(false);
  emailError = signal<string | null>(null);
  passwordError = signal<string | null>(null);
  isSubmitting = signal(false);

  constructor(
    private router: Router,
    private toastController: ToastController,
    private authService: AuthService
  ) {
    addIcons({ eye, eyeOff });
  }

  togglePasswordVisibility() {
    this.showPassword.update(value => !value);
  }

  onEmailChange() {
    this.emailError.set(null);
  }

  onPasswordChange() {
    this.passwordError.set(null);
  }

  async submit(event: Event) {
    event.preventDefault();

    const credential = this.email().trim();
    const password = this.password().trim();

    // Clear previous errors
    this.emailError.set(null);
    this.passwordError.set(null);

    // Validate credential (email or username)
    if (!credential) {
      this.emailError.set('Email or username is required');
      return;
    }
    if (credential.includes('@') && !this.isValidEmail(credential)) {
      this.emailError.set('Invalid email format');
      return;
    }

    // Validate password
    if (!password) {
      this.passwordError.set('Password is required');
      return;
    }
    if (password.length < 5) {
      this.passwordError.set('Password must be at least 5 characters');
      return;
    }

    // Set loading state
    this.isSubmitting.set(true);

    try {
      // Call auth API with email or username
      const response = await firstValueFrom(this.authService.login(credential, password));

      if (response?.success && response?.token) {
        // Show success toast
        await this.showToast('Logged in successfully!');

        // Navigate to dashboard
        await this.router.navigate(['/dashboard']);
      } else {
        // Show server error
        this.emailError.set(response?.error || 'Login failed');
      }
    } catch (error: any) {
      // Handle HTTP errors
      const errorMessage = error?.error?.error || 'Invalid credentials';
      this.emailError.set(errorMessage);
      console.error('Login error:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  async createAccount() {
    await this.showToast('Feature coming soon');
  }

  async forgotPassword() {
    await this.showToast('Password reset email sent');
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}

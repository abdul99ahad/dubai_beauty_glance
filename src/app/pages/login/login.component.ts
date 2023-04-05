import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/user-login.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: UserLogin = { email: '', password: '' };
  public emailInvalid: boolean;
  public passwordInvalid: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public Login() {
    if (!this.emailInvalid && !this.passwordInvalid) {
      this.authService.signIn(this.user).subscribe(
        (token) => {
          this.authService.setSession(token.data, this.user);
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Warning: No match for E-Mail Address and/or Password.');
        }
      );
    }
  }
  public ValidateEmail() {
    this.emailInvalid = false;
    if (
      this.user.email.length > 0 &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)
    ) {
      this.emailInvalid = true;
    }
  }

  public ValidatePassword() {
    this.passwordInvalid = false;
    if (this.user.password.length > 0 && this.user.password.length < 6) {
      this.passwordInvalid = true;
    }
  }
}

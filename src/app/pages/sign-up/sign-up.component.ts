import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/user-login.interface';
import { UserRegister } from 'src/app/interfaces/user-register.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  title: string = 'Create an Account';
  public user: UserRegister = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    contact: '',
  };
  private loggedInUser: UserLogin;
  registerFormFields: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    contactNo: 'Contact No',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    subscribeNewsLetter: 'Subscribe',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public SignUp(): void {
    this.authService.signUp(this.user).subscribe(
      (token) => {
        this.authService.setSession(token.data, this.user);
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Error has occured');
      }
    );
  }
}

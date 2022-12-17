import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  title: string = 'Register';
  registerFormFields: any = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    contactNo: 'Contact No',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    subscribeNewsLetter: 'Subscribe',
  };

  constructor() {}

  ngOnInit(): void {}
}

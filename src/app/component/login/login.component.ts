import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [Validators.required])
  });

  get email() {
    return this.loginform.get('email')
  }

  get password() {
    return this.loginform.get('password')
  }

  login(e) {
    this.authService.loginApp(e.target.email.value, e.target.password.value);
  }

}

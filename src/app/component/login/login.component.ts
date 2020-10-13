import { Component, OnInit } from '@angular/core';
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

  login(e) {
    this.authService.loginApp(e.target.email.value, e.target.password.value);
  }

}

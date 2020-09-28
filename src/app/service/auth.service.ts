import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authentication } from 'src/app/model/authentication'
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { 
      this.logout();
    }
  login() {
    this.http
      .post<Authentication>(`${environment.root}${environment.authUrl}`,
        `grant_type=client_credentials&client_id=${environment.clientId}&client_secret=${environment.clientSecret}`,
        { headers: headers })
      .subscribe(
        data => {
          this.setSession(data);
        },
        error => {
          this._snackBar.open('Authentication failed!! Try again', 'Login', {
            duration: 2000,
          });
          console.log(error);
        }
      );
  }

  private setSession(authResult: Authentication) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('user_name', authResult.username);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  getToken(): string {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

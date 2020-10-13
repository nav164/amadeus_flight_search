import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authentication } from 'src/app/model/authentication'
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstant } from '../config/constant';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginMap = new Map();
  //loggedIn: boolean;
  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar,
    public router: Router) {
 /*   if(this.loggedIn) {
      this.logout();
    } */
    this.loginMap.set('naveen.deism@gmail.com','rfvrfv');
  }

  /**
   * Perform the authentication by calling API using client 
   * secret and ID and save the jwt token into the local storage
   * @author Naveen
   */
  login(): Observable<Authentication> {
    return this.http
      .post<Authentication>(`${environment.root}${environment.authUrl}`,
        `grant_type=client_credentials&client_id=${environment.clientId}&client_secret=${environment.clientSecret}`,
        { headers: headers });
  }

  /**
   * Set the authentication data into the local storage
   * @author Naveen
   * @param authResult Authentication
   */
  private setSession(authResult: Authentication) {
    const expiresAt = moment().add(authResult.expires_in, 'second');
    localStorage.setItem(AppConstant.session_token_id, authResult.access_token);
    localStorage.setItem(AppConstant.session_user_name, authResult.username);
    localStorage.setItem(AppConstant.session_expire_at, JSON.stringify(expiresAt.valueOf()));
  }

  /**
   * return the token save in localstorage
   * @author Naveen
   * @returns string
   */
  getToken(): string {
    return localStorage.getItem(AppConstant.session_token_id);
  }

  /**
   * Removes the authentication data from local storage
   * @author Naveen
   */
  logout() {
    localStorage.removeItem(AppConstant.session_token_id);
    localStorage.removeItem(AppConstant.session_user_name);
    localStorage.removeItem(AppConstant.session_expire_at);
    this.router.navigateByUrl('login');
  }

  /**
   * Check if user is logged in or not
   * @author Naveen
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * Check if user if logged out
   * @author Naveen
   */
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  /**
   * Returns the token expiration time
   * @author Naveen
   */
  getExpiration() {
    const expiration = localStorage.getItem(AppConstant.session_expire_at);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  loginApp(email: string, password: string) {
    if(this.loginMap.has(email) && this.loginMap.get(email) === password) {
      this.login().subscribe(
        data => {
          this.setSession(data);
          console.log('Login done --> ', this.getToken())
          this.router.navigateByUrl('home');
        },
        error => {
          this._snackBar.open(AppConstant.authentication_failed, AppConstant.login, {
            duration: 2000,
          });
          console.log(error);
        }
      );
    } else {
      this._snackBar.open('Incorrect username or password!!', AppConstant.login, {
        duration: 5000,
      });
    }
  }
}

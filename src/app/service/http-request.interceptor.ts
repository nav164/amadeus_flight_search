import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Error500 } from '../model/error500';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,
    private _loading: LoadingService,
    private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Setting token in the header
    if (!request.url.includes(environment.authUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });

    }
    //Activating progress spinner
    this._loading.setLoading(true, request.url);

    return next.handle(request)
      .pipe(catchError((err) => {
        this._loading.setLoading(false, request.url);
        this.handleError(err);
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
        return evt;
      }));
  }

  handleError(error: HttpErrorResponse | Error500) {
    if (error instanceof HttpErrorResponse) {
      if(error.status === 400) {
        this._snackBar.open(error.error.error_description, error.error.title, {
          duration: 2000,
        });
      } else if(error.status === 401) {
        this._snackBar.open('The access token provided in the Authorization header is invalid', 
        'Invalid access token', {
          duration: 2000,
      });
    }
    } else if (error.errors) {
      error.errors.forEach(err => {
        this._snackBar.open(err.detail, err.title, {
          duration: 2000,
        });
      });
    }
  }
}

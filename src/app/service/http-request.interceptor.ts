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
import { AppConstant } from '../config/constant';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,
    private _loading: LoadingService,
    private _snackBar: MatSnackBar) { }

  /**
   * Intercept the http request and response, add token to the request header.
   * Show and hide the progress spinner in between the request and response.
   * Handle the server side errors.
   * @author Naveen
   * @param request HttpRequest<any>
   * @param next HttpHandler
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Setting token in the header
    if (!request.url.includes(environment.authUrl)) {
      request = request.clone({
        setHeaders: {
          Authorization: `${AppConstant.bearer} ${this.authService.getToken()}`
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

  /**
   * Handle the error in the response and show the error message in the snack bar.
   * @author Naveen
   * @param error HttpErrorResponse | Error500
   */
  handleError(error: HttpErrorResponse | Error500) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        if(error.error.error_description && error.error.title) {
          this._snackBar.open(error.error.error_description, error.error.title, {
            duration: 2000,
          });
        } else {
          this.handleCustomError(error);
        }
      } else if (error.status === 401) {
        this._snackBar.open(AppConstant.expire_session,
          AppConstant.invalid_token, {
          duration: 2000,
        });
      } else if(error.status === 404) {
        this.handleCustomError(error);
      }
    } else if (error.errors) {
      this.handleError500(error);
    }
  }

  /**
   * Handles custom error messages
   * @author Naveen
   * @param error any
   */
  handleError500(error: Error500) {
    error.errors.forEach(err => {
      this._snackBar.open(err.detail, err.title, {
        duration: 2000,
      });
    });
  }

  handleCustomError(error: HttpErrorResponse) {
    error.error['errors'].forEach(err => {
      this._snackBar.open(err.detail, err.title, {
        duration: 2000,
      });
    });
  }
}

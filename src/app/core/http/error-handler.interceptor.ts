/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

/** Environment Configuration */
import { environment } from 'environments/environment';

/** Custom Services */
import { Logger } from '../logger/logger.service';
import { AlertService } from '../alert/alert.service';
import {AuthenticationErrorAlert, SystemAlert, SystemErrorAlert} from '../alert/alert.model';

/** Initialize Logger */
const log = new Logger('ErrorHandlerInterceptor');

/**
 * Http Request interceptor to add a default error handler to requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  /**
   * @param {AlertService} alertService Alert Service.
   */
  constructor(private alertService: AlertService) {  }

  /**
   * Intercepts a Http request and adds a default error handler.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.handleError(error)));
  }

  /**
   * Error handler.
   */
  private handleError(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    const status = response.status;
    let errorMessage = (response.error.defaultUserMessage || response.message);
    if (response.error.errors) {
      if (response.error.errors[0]) {
        errorMessage = response.error.errors[0].defaultUserMessage || response.error.errors[0].developerMessage;
      }
    }

    if (!environment.production) {
      log.error(`Request Error: ${errorMessage}`);
    }

    if (status === 401 && errorMessage === 'Invalid credentials!.'/*|| (environment.oauth.enabled && status === 400) */) {
      this.alertService.alert(new AuthenticationErrorAlert(
        'Authentication Error',
        errorMessage,
        4000));
    } else if (status === 401) {
      this.alertService.alert(new AuthenticationErrorAlert(
        'Authentication Error',
        'Invalid Authentication Details. Please login and try again!',
        4000));
    } else if (status === 403 && errorMessage === 'Invalid code!') {
      this.alertService.alert( new SystemErrorAlert('Invalid Token', 'Invalid code. Please try again!'));
    } else if (status === 400) {
      this.alertService.alert({ type: 'Bad Request', message: 'Invalid parameters were passed in the request!' });
    } else if (status === 403) {
      this.alertService.alert({ type: 'Unauthorized Request', message: errorMessage || 'You are not authorized for this request!' });
    } else if (status === 404) {
      this.alertService.alert({ type: 'Resource does not exist', message: errorMessage || 'Resource does not exist!' });
    }  else if (status === 500) {
      this.alertService.alert({ type: 'Internal Server Error', message: 'Internal Server Error. Please try again later.' });
    } else if (status === 0) {
      this.alertService.alert({ type: 'Connection Error', message: 'Server is unreachable. Please check your network connection or try again later.' });
    } else {
      this.alertService.alert({ type: 'Unknown Error', message: 'Unknown Error. Please try again later.' });
    }
    throw response;
  }

}

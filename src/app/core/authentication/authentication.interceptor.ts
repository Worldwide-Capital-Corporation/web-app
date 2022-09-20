/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Environment Configuration */
import { environment } from '../../../environments/environment';

/** Http request options headers. */
const httpOptions = {
  headers: {
     'Fineract-Platform-TenantId': environment.fineractPlatformTenantId
  }
};

/** Authorization header. */
const authorizationHeader = 'Authorization';
/** Two factor access token header. */
const twoFactorAccessTokenHeader = 'Fineract-Platform-TFA-Token';

/** Two factor access token header. */
const twoFactorMFACodeHeader = 'Fineract-Platform-MFA-Token';

/**
 * Http Request interceptor to set the request headers.
 */
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Intercepts a Http request and sets the request headers.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: httpOptions.headers });
    return next.handle(request);
  }

  /**
   * Sets the basic/oauth authorization header depending on the configuration.
   * @param {string} authenticationKey Authentication key.
   */
  setAuthorizationToken(authenticationKey: string) {
    if (environment.oauth.enabled) {
      console.log('>>>>>>>>> interceptor setting Bearer to', authenticationKey);
      httpOptions.headers[authorizationHeader] = `Bearer ${authenticationKey}`;
    } else {
      console.log('>>>>>>>>> interceptor setting Basic to', authenticationKey);
      httpOptions.headers[authorizationHeader] = `Basic ${authenticationKey}`;
    }
  }

  /**
   * Sets the two factor access token header.
   * @param {string} twoFactorAccessToken Two factor access token.
   */
  setTwoFactorAccessToken(twoFactorAccessToken: string) {
    httpOptions.headers[twoFactorAccessTokenHeader] = twoFactorAccessToken;
  }

  /**
   * Sets the two factor access token header.
   * @param {string} twoFactorAccessToken Two factor access token.
   */
  setTwoFactorMFACode(code?: string) {
    if (code === null) {
      delete httpOptions.headers[twoFactorMFACodeHeader];
    } else {
      httpOptions.headers[twoFactorMFACodeHeader] = code;
    }
  }

  /**
   * Removes the authorization header.
   */
  removeAuthorization() {
    delete httpOptions.headers[authorizationHeader];
  }

  /**
   * Removes the two factor access token header.
   */
  removeTwoFactorAuthorization() {
    delete httpOptions.headers[twoFactorAccessTokenHeader];
  }

}

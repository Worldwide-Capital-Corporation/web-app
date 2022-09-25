import { Component, OnInit } from '@angular/core';
import {MultiFactorAuthentication} from '../multi-factor-authentication.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'mifosx-authenticator-app',
  templateUrl: './authenticator-app.component.html',
  styleUrls: ['./authenticator-app.component.scss']
})
export class AuthenticatorAppComponent implements OnInit {

  /** App code verification input form group. */
  appCodeVerificationForm: FormGroup;

  /** MFA model. */
  twoFactorData: MultiFactorAuthentication;

  enrolled?: Boolean = true;

  /** True if loading. */
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) { }

  /**
   * Creates authenticator app verification input form.
   *
   * Gets the delivery methods available to receive OTP.
   */
  ngOnInit() {
    this.createAppCodeVerificationForm();
    this.authenticationService.getMFAStatus()
      .subscribe((twoFactorData: MultiFactorAuthentication) => {
        this.twoFactorData = twoFactorData;
        this.enrolled = twoFactorData.enrolled;
      });
  }

  /**
   * Validates the OTP and authenticates the user.
   */
  validateOTP() {
    this.loading = true;
    this.appCodeVerificationForm.disable();
    this.authenticationService.validateMultiFactorAppCode(
      this.appCodeVerificationForm.value.otp,
      this.twoFactorData.enrolled
      )
      .pipe(finalize(() => {
        this.appCodeVerificationForm.reset();
        this.appCodeVerificationForm.markAsPristine();
        // Angular Material Bug: Validation errors won't get removed on reset.
        this.appCodeVerificationForm.enable();
        this.loading = false;
      })).subscribe();
  }

  /**
   * Creates app code verification form input.
   */
  private createAppCodeVerificationForm() {
    this.appCodeVerificationForm = this.formBuilder.group({
      'otp': ['', Validators.required]
    });
  }
}

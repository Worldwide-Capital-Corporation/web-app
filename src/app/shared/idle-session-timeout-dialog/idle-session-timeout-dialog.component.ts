import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../core/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'mifosx-idle-session-timeout-dialog',
  templateUrl: './idle-session-timeout-dialog.component.html',
  styleUrls: ['./idle-session-timeout-dialog.component.scss']
})
export class IdleSessionTimeoutDialogComponent implements OnInit, OnDestroy {

  /** Count down timer to auto logout user */
  timer: any;
  /** Count down timer to auto logout user */
  timerId: any;
  /** Seconds left to timeout and auto logout user */
  seconds: number;
  /**
   * @param {MatDialogRef} dialogRef Component reference to dialog.
   * @param {AuthenticationService} authenticationService Authentication service.
   * @param {Router} router Router for navigation.
   * @param {any} data Provides a deleteContext.
   */
  constructor(public dialogRef: MatDialogRef<IdleSessionTimeoutDialogComponent>,
              private authenticationService: AuthenticationService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.seconds = this.data.timer;
    this.timerId = setInterval(() => {
      this.seconds--;
      }, 1000);

    this.timer = setTimeout(() => {
      this.logout();
      }, this.data.timer * 1000);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
    clearInterval(this.timerId);
  }

  continue() {
    clearTimeout(this.timer);
    clearInterval(this.timerId);
    this.dialogRef.close();
  }

  logout() {
    this.dialogRef.close();
    this.authenticationService.logout()
      .subscribe(() => {
        this.router.navigate(['/login'], { replaceUrl: true }).then( (loggedOut) => {
        });
      });
  }
}

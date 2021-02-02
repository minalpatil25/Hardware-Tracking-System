import { Component, OnInit } from '@angular/core';
import { FormActions } from 'src/app/util/ui-labels';
import { FormResult } from 'src/app/layout/form-dialog/form-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  oldPasswordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  confirmNewPasswordVisible: boolean = false;
  passwordMismatch: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
  }

  change() {
    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordMismatch = true;
      return;
    } else {
      this.passwordMismatch = false;
    }

    let out: FormResult = {
      action: FormActions.CHANGE,
      value: {
        oldPassword: "",
        newPassword: ""
      }
    }

    this.dialogRef.close(out);
  }

  close() {
    let out: FormResult = {
      action: FormActions.CLOSE
    }

    this.dialogRef.close(out);
  }
}

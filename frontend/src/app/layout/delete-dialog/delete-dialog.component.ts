import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormActions } from 'src/app/util/ui-labels';
import { FormResult } from 'src/app/layout/form-dialog/form-dialog.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  ele: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DeleteDialogComponent>) { 
    this.ele = data.ele;
  }

  ngOnInit(): void {
  }

  delete() {
    let out: FormResult = {
      action: FormActions.DELETE,
      value: this.ele
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

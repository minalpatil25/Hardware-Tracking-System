import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormActions } from 'src/app/util/ui-labels';

export interface FormResult {
  action: string;
  value?: any;
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  @ViewChild(DynamicFormComponent, { static: false })
  form: DynamicFormComponent;
  
  config: FieldConfig[] = [];
  action: string;
  ele: any;
  name: string;

  showSaveButton?: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FormDialogComponent>) { 
    this.action = data.action;
    this.config = data.config;
    this.ele = data.ele;
    this.name = data.name;

    if (this.action == FormActions.EDIT) {
      const editConfig: FieldConfig[] = [];
      
      this.config.forEach(formControl => {
        const editControl = {...formControl};
        editControl.value = this.ele[editControl.name];
        if (editControl.editOff && editControl.editOff === true) {
          editControl.disabled = true;
        } else {
          editControl.disabled = false;
        }
        editConfig.push(editControl);
      });

      this.config = editConfig;
    }

    if (this.action == FormActions.VIEW) {
      const viewConfig: FieldConfig[] = [];
      
      this.config.forEach(formControl => {
        const editControl = {...formControl};
        editControl.value = this.ele[editControl.name];
        editControl.disabled = true;
        viewConfig.push(editControl);
      });

      this.config = viewConfig;
      this.showSaveButton = false;
    }
  }

  ngOnInit(): void {
  }

  save() {
    let out: FormResult = {
      action: this.action,
      value: this.form.form.getRawValue()
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

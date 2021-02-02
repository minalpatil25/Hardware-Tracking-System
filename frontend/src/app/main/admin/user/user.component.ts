import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { HttpService } from 'src/app/service/http-service.service';

export interface User {
  id?: number;
  name: string;
  //password: string;
  url?: string;
  children?: User[];
  }


const ELEMENT_DATA: User[] = [
 /* {id: 1, password: 'test1', name: 'test1'},
  {id: 2, password: 'test2', name: 'test2'},
  {id: 3, password: 'test3', name: 'test3'}*/

  
]; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  page: string = "User";
  baseUri: string = "/users"

  displayedColumns: string[] = ['name', 'password', 'control'];
  dataSource = [];

  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog,public httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: User[]) => {
        this.dataSource = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.formConfig = [
      {
        id: 'id',
        type: 'id',
        label: UILabels.ID,
        name: UILabelServerMapping.ID,
        rowIndex: 0,
        width: 100,
        autoGenerateId: false
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.NAME,
        name: UILabelServerMapping.NAME,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Name is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.PASSWORD,
        name: UILabelServerMapping.PASSWORD,
        rowIndex: 3,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Password is required'
          }
        ],
        width: 100
      }
    ];
  }

  openAddDialog() {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        action: FormActions.ADD,
        config: this.formConfig,
        name: this.page
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      let result: FormResult = res;
      if (result.action == FormActions.ADD) {
        let newEle: User = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: User) => {
            this.dataSource.push(data);
            this.dataSource = [...this.dataSource];
          },
          (err) => {
            console.log(err);
          }
        );
        // TODO : remove after backend implementation
        // result.value.id = new Date().getTime();

        // this.dataSource.push(result.value);
        // this.dataSource = [...this.dataSource];
      }
    });
  }

  openEditDialog(ele: any) {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        action: FormActions.EDIT,
        config: this.formConfig,
        ele: ele,
        name: this.page
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      let result: FormResult = res;
      if (result.action == FormActions.EDIT) {
        let editEle: User = result.value;

        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: User) => {
            let tmpDataSource = this.dataSource.filter(ele => ele.id != data.id);
            tmpDataSource.push(editEle);

            this.dataSource = tmpDataSource;
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  openViewDialog(ele: any) {
    let dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        action: FormActions.VIEW,
        config: this.formConfig,
        ele: ele,
        name: this.page
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      // No action required
    });
  }

  openDeleteDialog(ele: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        ele: ele
      },
      height: '250px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(res => {
      let result: FormResult = res;
      if (result.action == FormActions.DELETE) {
        let delEle: User = result.value;

        this.httpService.delete(this.baseUri, delEle.id).subscribe(
          () => {
            this.dataSource = this.dataSource.filter(ele => ele.id != delEle.id);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }
}

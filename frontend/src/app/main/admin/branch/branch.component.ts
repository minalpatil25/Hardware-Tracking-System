import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { HttpService } from 'src/app/service/http-service.service';

export interface Branch {
  id?: number;
  code: string;
  name: string;
  branchManager: string;
  userName: string;
  password: string;
}

const ELEMENT_DATA: Branch[] = [
 /* {id: 1, code: 'test1', name: 'test1'},
  {id: 2, code: 'test2', name: 'test2'},
  {id: 3, code: 'test3', name: 'test3'}*/
];  

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  
  page: string = "Branch";
  baseUri: string = "/branches"

  displayedColumns: string[] = ['code', 'name', 'branchManager','userName','password','control'];
  dataSource = [];

  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog,public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Branch[]) => {
        this.dataSource = data;
        //console.log(data);
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
        label: UILabels.CODE,
        name: UILabelServerMapping.CODE,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Code is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.NAME,
        name: UILabelServerMapping.NAME,
        rowIndex: 3,
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
        label: UILabels.BRANCHMANAGER,
        name: UILabelServerMapping.BRANCHMANAGER,
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'BranchManager is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.USERNAME,
        name: UILabelServerMapping.USERNAME,
        rowIndex: 5,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'UserName is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.PASSWORD,
        name: UILabelServerMapping.PASSWORD,
        rowIndex: 5,
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
        let newEle: Branch = result.value;
        // TODO : remove after backend implementation
        //result.value.id = new Date().getTime();
        
        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: Branch) => {
            this.dataSource.push(data);
            this.dataSource = [...this.dataSource];
          },
          (err) => {
            console.log(err);
          }
        );

       // this.dataSource.push(result.value);
        //this.dataSource = [...this.dataSource];
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
        let editEle: Branch = result.value;
        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: Branch) => {
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
        let delEle: Branch = result.value;
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

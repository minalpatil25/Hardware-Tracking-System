import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { FormActions, UILabelServerMapping, UILabels } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { HttpService } from 'src/app/service/http-service.service';
import { AssetType } from '../../admin/assettype/assettype.component';
import { Branch } from '../../admin/branch/branch.component';

export interface Transfer {
  id?: number;
  assetType: string;
  productSerialNo: string;
  fromBranch: string;
  toBranch: string;
  date: Date;
  isVerified: boolean;
}

const ELEMENT_DATA: Transfer[] = [
  {id: 1, assetType: "CPU", productSerialNo: "ABR12R", fromBranch: "PUNE", toBranch: "NAGAR", date: new Date(), isVerified: false},
  {id: 2, assetType: "Moniter", productSerialNo: "ABR143", fromBranch: "PUNE", toBranch: "NAGAR", date: new Date(), isVerified: true}
];  

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  
  page: string = "Transfer";
  baseUri: string = "/transfer"
  assetbaseUri: string = "/assettypes";
  branchbaseUri: string = "/branches"

  displayedColumns: string[] = ['assetType', 'productSerialNo', 'fromBranch', 'toBranch', 'date', 'isVerified', 'control'];
  dataSource = [];
  assetType=[];
  branchName=[];

  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog,public httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Transfer[]) => {
        this.dataSource = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.httpService.get(this.assetbaseUri).subscribe(
      (data: AssetType[]) => {
        this.assetType=data.map(ele => {
                      return {
                        label:ele.type,
                        value:ele.type
                      }
                    });
        this.loadFormConfig();
      },
      
      (err) => {
        console.log(err);
      }
    );
    this.httpService.get(this.branchbaseUri).subscribe(
      (data:Branch[]) => {
        this.branchName = data.map(ele =>{
         return {
          label:ele.name,
          value:ele.name
         }
        });
        this.loadFormConfig();
        console.log(this.branchName);
      },
      (err) => {
        console.log(err);
      }
    );
  }
    loadFormConfig(){
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
        id: 'select',
        type: 'select',
        label: UILabels.ASSET_TYPE,
        name: UILabelServerMapping.ASSET_TYPE,
        options: this.assetType,
        rowIndex: 1,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Asset type is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.PRODUCT_SERIAL_NO,
        name: UILabelServerMapping.PRODUCT_SERIAL_NO,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Product serial no is required'
          }
        ],
        width: 100
      },
      {
        id: 'select',
        type: 'select',
        label: UILabels.FROM_BRANCH,
        name: UILabelServerMapping.FROM_BRANCH,
        options: this.branchName,
        rowIndex: 3,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Branch code is required'
          }
        ],
        width: 50
      },
      {
        id: 'select',
        type: 'select',
        label: UILabels.TO_BRANCH,
        name: UILabelServerMapping.TO_BRANCH,
        options: this.branchName,
        rowIndex: 3,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Branch code is required'
          }
        ],
        width: 50
      },
      {
        id: 'datepicker',
        type: 'datepicker',
        label: UILabels.DATE,
        name: UILabelServerMapping.DATE,
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Date no is required'
          }
        ],
        width: 100
      },
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
        let newEle: Transfer = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: Transfer) => {
            this.dataSource.push(data);
            this.dataSource = [...this.dataSource];
          },
          (err) => {
            console.log(err);
          }
        );
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
        let editEle: Transfer = result.value;

        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: Transfer) => {
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
        let delEle: Transfer = result.value;

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


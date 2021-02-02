import { Component, OnInit } from '@angular/core';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { HttpService } from 'src/app/service/http-service.service';
import { Branch } from '../../admin/branch/branch.component';
import { AssetType } from '../../admin/assettype/assettype.component';

export interface Scrap {
  id?: number;
  productSerialNo: string;
  assetType: string;
  date: Date;
  reason: string;
  branch: string;
  isVerified: boolean;
}

const ELEMENT_DATA: Scrap[] = [
  {id: 1, productSerialNo: "ABR12R", assetType: "CPU", reason: "Not starting", date: new Date(), branch: "PUNE", isVerified: false},
  {id: 2, productSerialNo: "AB412R", assetType: "Moniter", reason: "Not starting", date: new Date(), branch: "PUNE", isVerified: true}
];  

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss']
})
export class ScrapComponent implements OnInit {

  page: string = "Scrap Asset";
  baseUri: string = "/scrap"
  assetbaseUri: string = "/assettypes";
  branchbaseUri: string = "/branches"

  displayedColumns: string[] = ['productSerialNo', 'assetType', 'date', 'reason', 'branch', 'isVerified', 'control'];
  dataSource = [];
  assetType=[];
  branchName=[];

  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog,public httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Scrap[]) => {
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
        //console.log(this.branchName);
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
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.PRODUCT_SERIAL_NO,
        name: UILabelServerMapping.PRODUCT_SERIAL_NO,
        rowIndex: 1,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Product serial no is required'
          }
        ],
        width: 50
      },
      {
        id: 'datepicker',
        type: 'datepicker',
        label: UILabels.DATE,
        name: UILabelServerMapping.DATE,
        rowIndex: 2,
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
      {
        id: 'input',
        type: 'input',
        label: UILabels.REASON,
        name: UILabelServerMapping.REASON,
        rowIndex: 3,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Reason is required'
          }
        ],
        width: 100
      },
      {
        id: 'select',
        type: 'select',
        label: UILabels.BRANCH,
        name: UILabelServerMapping.BRANCH,
        options: this.branchName,
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Branch is required'
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
        let newEle: Scrap = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: Scrap) => {
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
        let editEle: Scrap = result.value;

        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: Scrap) => {
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
        let delEle: Scrap = result.value;

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

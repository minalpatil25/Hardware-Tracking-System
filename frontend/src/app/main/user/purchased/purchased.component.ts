import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { HttpService } from 'src/app/service/http-service.service';
import { Branch } from '../../admin/branch/branch.component';
import { AssetType } from '../../admin/assettype/assettype.component';

export interface Purchase {
  id?: number;
  assetName: string;
  assetType: string;
  productSerialNo: string;
  vendorCode: string;
  cost: number;
  branch: string;
  date: Date;
  isVerified: boolean;
}

const ELEMENT_DATA: Purchase[] = [
  {id: 1, assetName: "Dell 1550", assetType: "CPU", productSerialNo: "ABR12R", cost: 100, branch: "PUNE", date: new Date(), vendorCode: "ABD", isVerified: false},
  {id: 2, assetName: "Dell 1550R", assetType: "Moniter", productSerialNo: "ABR143", cost: 200, branch: "PUNE", date: new Date(), vendorCode: "ABD", isVerified: true}
];  

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.scss']
})
export class PurchasedComponent implements OnInit {
   
  page: string = "Purchase";
  baseUri: string = "/purchase"
  branchbaseUri: string = "/branches";
  assetbaseUri: string = "/assettypes";

  displayedColumns: string[] = ['assetName', 'assetType', 'productSerialNo', 'vendorCode', 'cost', 'date', 'isVerified', 'control'];
  dataSource = [];
  branchName = [];
  formConfig: FieldConfig[];
  assetType=[];

  constructor(public dialog: MatDialog,public httpService: HttpService) { }

  ngOnInit(): void {

    this.httpService.get(this.baseUri).subscribe(
      (data: Purchase[]) => {
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
        id: 'input',
        type: 'input',
        label: UILabels.ASSET_NAME,
        name: UILabelServerMapping.ASSET_NAME,
        rowIndex: 1,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Asset name is required'
          }
        ],
        width: 50
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
        rowIndex: 3,
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
        label: UILabels.VENDOR_CODE,
        name: UILabelServerMapping.VENDOR_CODE,
        options: [
          { label: "ABD", value: "ABD" }, { label: "ZERO", value: "ZERO" }
        ],
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Vendor code is required'
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
        rowIndex: 5,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Branch code is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.COST,
        name: UILabelServerMapping.COST,
        rowIndex: 6,
        numberInput: true,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Cost no is required'
          }
        ],
        width: 50
      },
      {
        id: 'datepicker',
        type: 'datepicker',
        label: UILabels.DATE,
        name: UILabelServerMapping.DATE,
        rowIndex: 6,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Date no is required'
          }
        ],
        width: 50
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
        let newEle: Purchase = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: Purchase) => {
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
        let editEle: Purchase = result.value;

        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: Purchase) => {
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
        let delEle: Purchase = result.value;

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

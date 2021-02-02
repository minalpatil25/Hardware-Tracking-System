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

export interface Maintenance {
  id?: number;
  assetName: string;
  assetType: string;
  productSerialNo: string;
  problem: string;
  newPart: string;
  serviceName: string;
  cost: number;
  venue: string;
  inwordDate: Date;
  outwordDate: Date;
  isVerified: boolean;
}

const ELEMENT_DATA: Maintenance[] = [
  {id: 1, assetName: "Dell 1550", assetType: "CPU", productSerialNo: "ABR12R", problem: "Not starting", newPart: "None", serviceName: "Dell service", cost: 200, venue: "PUNE", inwordDate: new Date(), outwordDate: new Date(), isVerified: false},
  {id: 2, assetName: "Dell 1550R", assetType: "Moniter", productSerialNo: "ABR143", problem: "Not starting", newPart: "None", serviceName: "Dell service", cost: 100, venue: "PUNE", inwordDate: new Date(), outwordDate: new Date(), isVerified: true}
]; 

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  
  page: string = "Maintenance";
  baseUri: string = "/maintenance";
  assetbaseUri: string = "/assettypes";
  branchbaseUri: string = "/branches"

  displayedColumns: string[] = ['assetName', 'assetType', 'productSerialNo', 'problem', 'newPart', 'serviceName', 'cost', 'venue', 'inwordDate', 'outwordDate', 'isVerified', 'control'];
  dataSource = [];
  assetType=[];
  branchName=[];
  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog,public httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Maintenance[]) => {
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

  loadFormConfig() {
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
        id: 'input',
        type: 'input',
        label: UILabels.PROBLEM,
        name: UILabelServerMapping.PROBLEM,
        rowIndex: 3,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Problem is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.SERVICE_NAME,
        name: UILabelServerMapping.SERVICE_NAME,
        rowIndex: 5,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Service name is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.COST,
        name: UILabelServerMapping.COST,
        rowIndex: 5,
        numberInput: true,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Cost is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.NEW_PART,
        name: UILabelServerMapping.NEW_PART,
        rowIndex: 6,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'New part is required'
          }
        ],
        width: 50
      },
      {
        id: 'select',
        type: 'select',
        label: UILabels.VENUE,
        name: UILabelServerMapping.VENUE,
        options: this.branchName ,
        rowIndex: 6,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Venue is required'
          }
        ],
        width: 50
      },
      {
        id: 'datepicker',
        type: 'datepicker',
        label: UILabels.INWORD_DATE,
        name: UILabelServerMapping.INWORD_DATE,
        rowIndex: 7,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Inword date is required'
          }
        ],
        width: 50
      },
      {
        id: 'datepicker',
        type: 'datepicker',
        label: UILabels.OUTWORD_DATE,
        name: UILabelServerMapping.OUTWORD_DATE,
        rowIndex: 7,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Outword date is required'
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
        let newEle: Maintenance = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: Maintenance) => {
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
        let editEle: Maintenance = result.value;
        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: Maintenance) => {
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
        let delEle: Maintenance = result.value;

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

import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { HttpService } from 'src/app/service/http-service.service';


export interface AssetType {
  id?: number;
  code: string;
  type: string;
  depriciation: number;
  
}
assetType:[];
const ELEMENT_DATA: AssetType[] = [
  /*{id: 1, code: 'test1', type: 'test1', depriciation: 10.1},
  {id: 2, code: 'test2', type: 'test2', depriciation: 15.1},
  {id: 3, code: 'test3', type: 'test3', depriciation: 12.1}*/
]; 

@Component({
  selector: 'app-assettype',
  templateUrl: './assettype.component.html',
  styleUrls: ['./assettype.component.scss']
})
export class AssettypeComponent implements OnInit {
  
  page: string = "Asset Type";
  baseUri: string = "/assettypes"

  displayedColumns: string[] = ['code', 'type', 'depriciation', 'control'];
  dataSource = [];

  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog, public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: AssetType[]) => {
        this.dataSource = data;
        //data.map(ele => ele.type);
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
        rowIndex: 1,
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
        label: UILabels.TYPE,
        name: UILabelServerMapping.TYPE,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Type is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.DEPRICIATION,
        name: UILabelServerMapping.DEPRICIATION,
        rowIndex: 3,
        numberInput: true,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Depriciation Percentage is required'
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
        let newEle: AssetType = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: AssetType) => {
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
        let editEle: AssetType = result.value;

        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: AssetType) => {
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
        let delEle: AssetType = result.value;

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

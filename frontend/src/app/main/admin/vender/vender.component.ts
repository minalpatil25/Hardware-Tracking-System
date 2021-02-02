import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { FormResult, FormDialogComponent } from 'src/app/layout/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { HttpService } from 'src/app/service/http-service.service';

export interface Vendor {
  id?: number;
  vCode: string;
  vName: string;
  cName: string;
  cMobile: string;
  cAddress: string;
  cCity: string;
  cPIN: string;
  cState: string;
  cFAX?: string;
  cTelephone?: string;
  cEmail?: string;
  cWebsite?: string;
  oCSTNo?: string;
  oMSTNo?: string;
  oTINNo?: string;
  oPAN: string;
  oServiceTaxNo: string;
  oExciseRegNo?: string;
  bName: string;
  bAccountNo: string;
  bIFSCCode: string;
  userName: string;
  password: string;
}

const ELEMENT_DATA: Vendor[] = [
 /* {id: 1, vCode: "test1", vName: "test1", cName: "Sushil Pawar", cMobile: "1234567891", cAddress: "Akurdi", cCity: "Pune", cPIN: "412101",
    cState: "Maharashtra", cEmail: "test@gmail.com", cWebsite: "www.gmail.com", oPAN: "AAAAAAA12", oServiceTaxNo: "SHDGF78455555", bName: "HDFC", bAccountNo: "1234522616", bIFSCCode: "HDFC000342"}*/
]; 

@Component({
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {
  page: string = "Vender";
  baseUri: string = "/venders"

  displayedColumns: string[] = ['vCode', 'vName', 'cCity', 'oPAN', 'oServiceTaxNo', 'bAccountNo', 'control'];
  dataSource = [];

  formConfig: FieldConfig[];

  constructor(public dialog: MatDialog,public httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Vendor[]) => {
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
        label: UILabels.VCODE,
        name: UILabelServerMapping.VCODE,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Code is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.VNAME,
        name: UILabelServerMapping.VNAME,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Name is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CNAME,
        name: UILabelServerMapping.CNAME,
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
        label: UILabels.CADDRESS,
        name: UILabelServerMapping.CADDRESS,
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Address is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CCITY,
        name: UILabelServerMapping.CCITY,
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'City is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CSTATE,
        name: UILabelServerMapping.CSTATE,
        rowIndex: 5,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'State is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CPIN,
        name: UILabelServerMapping.CPIN,
        rowIndex: 5,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'PIN is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CMOBILE,
        name: UILabelServerMapping.CMOBILE,
        rowIndex: 6,
        required: true,
        validation: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        errMsg: [
          {
            key: 'required',
            value: 'Mobile is required'
          },
          {
            key: 'minlength',
            value: 'Invalid mobile number'
          },
          {
            key: 'maxlength',
            value: 'Invalid mobile number'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CTELEPHONE,
        name: UILabelServerMapping.CTELEPHONE,
        rowIndex: 6,
        required: false,
        validation: [Validators.minLength(10), Validators.maxLength(10)],
        errMsg: [
          {
            key: 'minlength',
            value: 'Invalid telephone number'
          },
          {
            key: 'maxlength',
            value: 'Invalid telephone number'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CFAX,
        name: UILabelServerMapping.CFAX,
        rowIndex: 7,
        required: false,
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CEMAIL,
        name: UILabelServerMapping.CEMAIL,
        rowIndex: 7,
        required: false,
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.CWEBSITE,
        name: UILabelServerMapping.CWEBSITE,
        rowIndex: 8,
        required: false,
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.OCSTNO,
        name: UILabelServerMapping.OCSTNO,
        rowIndex: 9,
        required: false,
        width: 50
      },
      ,
      {
        id: 'input',
        type: 'input',
        label: UILabels.OMSTNO,
        name: UILabelServerMapping.OMSTNO,
        rowIndex: 9,
        required: false,
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.OTINNO,
        name: UILabelServerMapping.OTINNO,
        rowIndex: 10,
        required: false,
        width: 50
      },
      ,
      {
        id: 'input',
        type: 'input',
        label: UILabels.OPAN,
        name: UILabelServerMapping.OPAN,
        rowIndex: 10,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'PAN is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.OSERVICETAXNO,
        name: UILabelServerMapping.OSERVICETAXNO,
        rowIndex: 11,
        required: false,
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.OEXCISEREGNO,
        name: UILabelServerMapping.OEXCISEREGNO,
        rowIndex: 11,
        required: false,
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.BNAME,
        name: UILabelServerMapping.BNAME,
        rowIndex: 12,
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
        label: UILabels.BACCOUNTNO,
        name: UILabelServerMapping.BACCOUNTNO,
        rowIndex: 13,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Account number is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.BIFSCCODE,
        name: UILabelServerMapping.BIFSCCODE,
        rowIndex: 14,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'IFSC Code is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.USERNAME,
        name: UILabelServerMapping.USERNAME,
        rowIndex: 15,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'IFSC Code is required'
          }
        ],
        width: 50
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.PASSWORD,
        name: UILabelServerMapping.PASSWORD,
        rowIndex: 15,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'IFSC Code is required'
          }
        ],
        width: 50
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
        let newEle: Vendor = result.value;

        this.httpService.post(this.baseUri, newEle).subscribe(
          (data: Vendor) => {
            this.dataSource.push(data);
            this.dataSource = [...this.dataSource];
          },
          (err) => {
            console.log(err);
          }
        );
        // // TODO : remove after backend implementation
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
        let editEle: Vendor = result.value;
        this.httpService.put(this.baseUri, editEle.id, editEle).subscribe(
          (data: Vendor) => {
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
        let delEle: Vendor = result.value;

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

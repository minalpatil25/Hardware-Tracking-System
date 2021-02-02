import { Component, OnInit } from '@angular/core';
import { FieldConfig } from 'src/app/layout/dynamic-form/models/field-config.interface';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/service/http-service.service';
import { UILabels, UILabelServerMapping, FormActions } from 'src/app/util/ui-labels';
import { Validators } from '@angular/forms';
import { FormDialogComponent, FormResult } from 'src/app/layout/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from 'src/app/layout/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { QreqProduct, QuotationRequest } from '../quotationrequest.component';
import { Vendor } from 'src/app/main/admin/vender/vender.component';

const ELEMENT_DATA: QreqProduct[] = [
 { id: 1, productName: "CPU", quantity: 5, deliveryDate: new Date()},
 { id: 2, productName: "Moniter", quantity: 5, deliveryDate: new Date()},
 { id: 3, productName: "Cable", quantity: 5, deliveryDate: new Date()}
]; 

@Component({
  selector: 'app-qreqdetail',
  templateUrl: './qreqdetail.component.html',
  styleUrls: ['./qreqdetail.component.scss']
})
export class QreqdetailComponent implements OnInit {
  page: string = "Quotation Request";
  baseUri: string = "/quotationrequest";
  vendorBaseUri: string = "/venders";

  displayedColumns: string[] = ['productName', 'quantity', 'deliveryDate'];
  dataSource = [];
  vendorData = [];
  vendors = [];

  action: string;
  formConfig: FieldConfig[];

  generateId: number = 0;
  quotationId: number;

  constructor(private router: Router, public dialog: MatDialog, public httpService: HttpService) { 

    let currentNav = this.router.getCurrentNavigation();
    if (currentNav.extras.state && currentNav.extras.state.action == FormActions.VIEW) {
        this.quotationId = currentNav.extras.state.quotationId;
        this.action = FormActions.VIEW;

        this.httpService.get(this.baseUri, this.quotationId).subscribe(
          (data: QuotationRequest) => {
            this.dataSource = data.product || [];
            this.vendorData = data.vendor || [];
          },
          (err) => {
            console.log(err);
          }
        );
    } 

    if (currentNav.extras.state && currentNav.extras.state.action == FormActions.ADD) {
      this.action = FormActions.ADD;

      let tmpDisplayedColumns = [...this.displayedColumns, 'control'];
      this.displayedColumns = tmpDisplayedColumns;
    } 
  }

  ngOnInit(): void {
    this.httpService.get(this.vendorBaseUri).subscribe(
      (data: Vendor[]) => {
        this.vendors=data.map(ele => {
                      return {
                        label: ele.vCode,
                        value: ele.vCode
                      }
                    });
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
        label: UILabels.PRODUCT_NAME,
        name: UILabelServerMapping.PRODUCT_NAME,
        rowIndex: 2,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Product name is required'
          }
        ],
        width: 100
      },
      {
        id: 'input',
        type: 'input',
        label: UILabels.QUANTITY,
        name: UILabelServerMapping.QUANTITY,
        rowIndex: 3,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Quantity is required'
          }
        ],
        width: 100
      },
      {
        id: 'datepicker',
        type: 'datepicker',
        label: UILabels.DELIVERY_DATE,
        name: UILabelServerMapping.DELIVERY_DATE,
        rowIndex: 4,
        required: true,
        validation: [Validators.required],
        errMsg: [
          {
            key: 'required',
            value: 'Delivery date is required'
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
        let newEle: QreqProduct = result.value;
        newEle.id = ++this.generateId;

        this.dataSource.push(newEle);
        this.dataSource = [...this.dataSource];
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
        let editEle: QreqProduct = result.value;
        let tmpDataSource = this.dataSource.filter(ele => ele.id != editEle.id);
        tmpDataSource.push(editEle);

        this.dataSource = tmpDataSource;
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
        let delEle: QreqProduct = result.value;
        this.dataSource = this.dataSource.filter(ele => ele.id != delEle.id);
      }
    });
  }

  sendQuotationRequest() {
    let qr: QuotationRequest = {
      product: this.dataSource,
      vendor: this.vendorData,
      date: new Date()
    } 

    this.httpService.post(this.baseUri, qr).subscribe(
      (data: QuotationRequest) => {
        this.router.navigate(['admin', 'quotationrequest']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
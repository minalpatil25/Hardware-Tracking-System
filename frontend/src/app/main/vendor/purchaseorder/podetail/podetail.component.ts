import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http-service.service';
import { PurchaseOrder } from '../purchaseorder.component';
import { QuotationResponse } from 'src/app/main/vendor/quotationresponse/quotationresponse.component';
import { FormActions } from 'src/app/util/ui-labels';

@Component({
  selector: 'app-podetail',
  templateUrl: './podetail.component.html',
  styleUrls: ['./podetail.component.scss']
})
export class PodetailComponent implements OnInit {
  page: string = "Purchase Order";
  baseUri: string = "/purchaseorder";
  quotationResponseBaseUri: string = "/quotationresponse";
  idListBaseUri: string = "/quotationresponse/idlist";

  displayedColumns: string[] = ['productName', 'quantity', 'price', 'total'];
  
  dataSource = [];
  pOrder: PurchaseOrder = {
    date: new Date()
  };
  purchaseOrderId: number;
  quotationResponseId: number;
  qRes: QuotationResponse = {};

  qResIds: number[] = [];
  action: string;
  isView: boolean = true;

  constructor(private router: Router, public httpService: HttpService) { 

    this.httpService.get(this.idListBaseUri).subscribe(
      (data: number[]) => {
        this.qResIds = data || [];
      },
      (err) => {
        console.log(err);
      }
    );

    let currentNav = this.router.getCurrentNavigation();
    if (currentNav.extras.state && currentNav.extras.state.action) {
      this.action = currentNav.extras.state.action;
    }

    if (this.action == FormActions.VIEW && currentNav.extras.state.purchaseOrderId && currentNav.extras.state.quotationResponseId) {
        this.purchaseOrderId = currentNav.extras.state.purchaseOrderId;
        this.quotationResponseId = currentNav.extras.state.quotationResponseId;

        this.httpService.get(this.baseUri, this.purchaseOrderId).subscribe(
          (data: PurchaseOrder) => {
            this.pOrder = data;
          },
          (err) => {
            console.log(err);
          }
        );

        this.httpService.get(this.quotationResponseBaseUri, this.quotationResponseId).subscribe(
          (data: QuotationResponse) => {
            this.dataSource = data.product;
            this.qRes = data;
          },
          (err) => {
            console.log(err);
          }
        );
    }

    if (this.action == FormActions.ADD) {
        this.isView = false;
    }
  }

  ngOnInit(): void {
  }

  changeQuotationResponseId() {
    this.quotationResponseId = this.pOrder.quotationResponseId;
    this.httpService.get(this.quotationResponseBaseUri, this.quotationResponseId).subscribe(
      (data: QuotationResponse) => {
        this.dataSource = data.product;
        this.qRes = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendPurchaseOrder() {

    this.httpService.post(this.baseUri, this.pOrder).subscribe(
      (data: QuotationResponse) => {
        this.router.navigate(['admin', 'purchaseorder']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

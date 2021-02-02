import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormActions } from 'src/app/util/ui-labels';

export interface PurchaseOrder {
  id?: number;
  date?: Date;
  quotationResponseId?: number;
  senderName?: string;
  deliveryAddr?: string;
  remarks?: string;
}

const ELEMENT_DATA: PurchaseOrder[] = [
  { id: 1, date: new Date(), deliveryAddr: 'Hiware Bazar', quotationResponseId: 6, senderName: 'Sushil Pawar', remarks: 'Good'},
  { id: 2, date: new Date(), deliveryAddr: 'Hiware Bazar', quotationResponseId: 6, senderName: 'Sushil Pawar', remarks: 'Good'},
  { id: 3, date: new Date(), deliveryAddr: 'Hiware Bazar', quotationResponseId: 6, senderName: 'Sushil Pawar', remarks: 'Good'}
]

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrls: ['./purchaseorder.component.scss']
})
export class PurchaseorderComponent implements OnInit {
 
  page: string = "Purchase Order";
  baseUri: string = "/purchaseorder"

  displayedColumns: string[] = ['id', 'quotationResponseId', 'date', 'control'];
  dataSource = [];

  constructor(public router: Router, public route: ActivatedRoute, public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: PurchaseOrder[]) => {
        this.dataSource = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewPurchaseOrder(purchaseOrderId: number, quotationResponseId: number) {
    this.router.navigate(['podetail'], { 
      relativeTo: this.route ,
      state: { 
        purchaseOrderId: purchaseOrderId,
        quotationResponseId: quotationResponseId,
        action: FormActions.VIEW
       }
    });
  }

  addPurchaseOrder() {
    this.router.navigate(['podetail'], { 
      relativeTo: this.route ,
      state: {
        action: FormActions.ADD
       }
    });
  }
}

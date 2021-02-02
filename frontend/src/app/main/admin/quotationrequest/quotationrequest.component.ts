import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormActions } from 'src/app/util/ui-labels';

export interface QuotationRequest {
    id?: number;
    product: QreqProduct[];
    vendor: string[];
    date: Date;
}

export interface QreqProduct {
  id?: number;
  productName: string;
  quantity: number;
  deliveryDate: Date;
}

const QREQ_PRODUCT_DATA: QreqProduct[] = [
 { id: 1, productName: "CPU", quantity: 5, deliveryDate: new Date()},
 { id: 2, productName: "Moniter", quantity: 5, deliveryDate: new Date()},
 { id: 3, productName: "Cable", quantity: 5, deliveryDate: new Date()}
]; 

const VENDOR_DATA: string[] = ['vendor1'];

const ELEMENT_DATA: QuotationRequest[] = [
  { id: 1, product: QREQ_PRODUCT_DATA, vendor: VENDOR_DATA, date: new Date()},
  { id: 2, product: QREQ_PRODUCT_DATA, vendor: VENDOR_DATA, date: new Date()},
  { id: 3, product: QREQ_PRODUCT_DATA, vendor: VENDOR_DATA, date: new Date()},
]

@Component({
  selector: 'app-quotationrequest',
  templateUrl: './quotationrequest.component.html',
  styleUrls: ['./quotationrequest.component.scss']
})
export class QuotationrequestComponent implements OnInit {
  page: string = "Quotation Request";
  baseUri: string = "/quotationrequest"

  displayedColumns: string[] = ['id', 'date', 'control'];
  dataSource = [];

  constructor(public router: Router, public route: ActivatedRoute, public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: QuotationRequest[]) => {
        this.dataSource = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addQuotationRequest() {
    this.router.navigate(['qreqdetail'], { 
      relativeTo: this.route ,
      state: {
        action: FormActions.ADD
       }
    });
  }

  viewQuotationRequest(quotationId: number) {
    this.router.navigate(['qreqdetail'], { 
      relativeTo: this.route ,
      state: { 
        quotationId: quotationId,
        action: FormActions.VIEW
       }
    });
  }
}

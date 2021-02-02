import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http-service.service';
import { FormActions } from 'src/app/util/ui-labels';
import { QreqProduct, QuotationRequest } from '../../admin/quotationrequest/quotationrequest.component';
import { AuthServiceService } from 'src/app/auth-service.service';

export interface QuotationResponse {
  id?: number;
  product?: QresProduct[];
  date?: Date;
  quotationRequestId?: number;
  vendor?: string;
  subtotal?: number;
  tax?: number;
  total?: number;
  paymentAdvance?: number;
  paymentAfterDelivery?: number;
  modeOfTransport?: string;
  desc?: string;
}

export interface QresProduct {
  id?: number;
  productName: string;
  quantity: number;
  price: number;
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
  selector: 'app-quotationresponse',
  templateUrl: './quotationresponse.component.html',
  styleUrls: ['./quotationresponse.component.scss']
})
export class QuotationresponseComponent implements OnInit {
  page: string = "Quotation Response";
  baseUri: string = "/quotationrequest/searchbyvendor"

  displayedColumns: string[] = ['quotationRequestId', 'date', 'control'];
  dataSource = [];

  constructor(public router: Router, public route: ActivatedRoute, public httpService: HttpService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    let searchReqBody = {
      vendor: this.authService.vCode
    }

    this.httpService.post(this.baseUri, searchReqBody).subscribe(
      (data: QuotationRequest[]) => {
        this.dataSource = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewQuotationResponse(quotationId: number) {
    this.router.navigate(['qresdetail'], { 
      relativeTo: this.route ,
      state: { 
        quotationId: quotationId
       }
    });
  }
}

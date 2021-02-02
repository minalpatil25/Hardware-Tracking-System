import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http-service.service';
import { QreqProduct, QuotationRequest } from '../../admin/quotationrequest/quotationrequest.component';

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
  page: string = "Quotation Response : Select Quotation Request";
  baseUri: string = "/quotationrequest"

  displayedColumns: string[] = ['quotationRequestId', 'date', 'control'];
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

  viewQuotationResponseList(quotationId: number) {
    this.router.navigate(['qreslist'], { 
      relativeTo: this.route ,
      state: { 
        quotationId: quotationId
       }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { QresProduct, QuotationResponse } from '../quotationresponse.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/service/http-service.service';
import { QuotationRequest, QreqProduct } from 'src/app/main/admin/quotationrequest/quotationrequest.component';
import { AuthServiceService } from 'src/app/auth-service.service';

const ELEMENT_DATA: QresProduct[] = [
  { id: 1, productName: "CPU", quantity: 5, price: 10},
  { id: 2, productName: "Moniter", quantity: 5, price: 14},
  { id: 3, productName: "Cable", quantity: 5, price: 18}
]; 

@Component({
  selector: 'app-qresdetail',
  templateUrl: './qresdetail.component.html',
  styleUrls: ['./qresdetail.component.scss']
})
export class QresdetailComponent implements OnInit {
  page: string = "Quotation Response";
  baseUri: string = "/quotationresponse";
  searchBaseUri: string = "/quotationresponse/searchbyrequestidnvendor";
  quotationRequestBaseUri= "/quotationrequest";
  vendorBaseUri: string = "/venders";

  displayedColumns: string[] = ['productName', 'quantity', 'price', 'total'];
  
  dataSource = [];
  qRes: QuotationResponse = {};
  quotationId: number;

  constructor(private router: Router, public dialog: MatDialog, public httpService: HttpService, private authService: AuthServiceService) { 

    let currentNav = this.router.getCurrentNavigation();
    if (currentNav.extras.state && currentNav.extras.state.quotationId) {
        this.quotationId = currentNav.extras.state.quotationId;

        let searchReqBody = {
          quotationId: this.quotationId,
          vendor: authService.vCode 
        }

        this.httpService.post(this.searchBaseUri, searchReqBody).subscribe(
          (data: QuotationResponse) => {
            this.qRes = data;
            this.dataSource = data.product || [];
          },
          (err1) => {
            this.httpService.get(this.quotationRequestBaseUri, this.quotationId).subscribe(
              (data: QuotationRequest) => {
                let products: QreqProduct[] = data.product || [];
                this.dataSource = products.map(ele => {
                  let qresProduct: QresProduct = {
                    id: ele.id,
                    productName: ele.productName,
                    quantity: ele.quantity,
                    price: 0
                  }

                  return qresProduct;
                })

                this.qRes = {
                  quotationRequestId: this.quotationId,
                  tax: 0,
                  paymentAdvance: 0,
                  paymentAfterDelivery: 100,
                  vendor: authService.vCode 
                };
              },
              (err2) => {
                console.log(err2);
              }
            );
          }
        );
    }
  }

  ngOnInit(): void {
  }

  getSubtotal() {
    if (!this.dataSource || this.dataSource.length == 0) {
      return 0;
    }

    return this.dataSource.map(qres => qres.price * qres.quantity).reduce((subtotal, itemTotal) => subtotal + itemTotal);
  }

  sendQuotationResponse() {

    this.qRes.product = this.dataSource;
    this.qRes.date = new Date();
    this.qRes.subtotal = this.getSubtotal();
    this.qRes.total = this.qRes.subtotal + this.qRes.tax;

    this.httpService.post(this.baseUri, this.qRes).subscribe(
      (data: QuotationResponse) => {
        this.router.navigate(['vendor', 'quotationresponse']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

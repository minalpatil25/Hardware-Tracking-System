import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http-service.service';
import { QuotationResponse } from 'src/app/main/vendor/quotationresponse/quotationresponse.component';

@Component({
  selector: 'app-qresdetail',
  templateUrl: './qresdetail.component.html',
  styleUrls: ['./qresdetail.component.scss']
})
export class QresdetailComponent implements OnInit {
  page: string = "Quotation Response : Vendor Response";
  baseUri: string = "/quotationresponse";

  displayedColumns: string[] = ['productName', 'quantity', 'price', 'total'];
  
  dataSource = [];
  qRes: QuotationResponse = {};
  quotationResId: number;
  quotationId: number;

  constructor(private router: Router, public httpService: HttpService) { 

    let currentNav = this.router.getCurrentNavigation();
    if (currentNav.extras.state && currentNav.extras.state.quotationResId && currentNav.extras.state.quotationId) {
        this.quotationResId = currentNav.extras.state.quotationResId;
        this.quotationId = currentNav.extras.state.quotationId;

        this.httpService.get(this.baseUri, this.quotationResId).subscribe(
          (data: QuotationResponse) => {
            this.qRes = data;
            this.dataSource = data.product || [];
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  ngOnInit(): void {
  }
}

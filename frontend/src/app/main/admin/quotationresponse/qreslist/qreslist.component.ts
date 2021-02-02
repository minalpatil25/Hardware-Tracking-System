import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http-service.service';
import { QuotationResponse } from 'src/app/main/vendor/quotationresponse/quotationresponse.component';

@Component({
  selector: 'app-qreslist',
  templateUrl: './qreslist.component.html',
  styleUrls: ['./qreslist.component.scss']
})
export class QreslistComponent implements OnInit {
  page: string = "Quotation Response : Select Vendor Response";
  baseUri: string = "/quotationresponse/searchbyrequestid"

  displayedColumns: string[] = ['quotationResponseId', 'vendor', 'totalPrice', 'date', 'control'];
  dataSource = [];
  quotationId: number;

  constructor(public router: Router, public route: ActivatedRoute, public httpService: HttpService) {
    
    let currentNav = this.router.getCurrentNavigation();
    if (currentNav.extras.state && currentNav.extras.state.quotationId) {
        this.quotationId = currentNav.extras.state.quotationId;

        let searchReqBody = {
          quotationId: this.quotationId
        }

        this.httpService.post(this.baseUri, searchReqBody).subscribe(
          (data: QuotationResponse[]) => {
            this.dataSource = data;
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  ngOnInit(): void {
    
  }

  viewQuotationResponse(quotationResId: number) {
    this.router.navigate(['qresdetail'], { 
      relativeTo: this.route ,
      state: { 
        quotationId: this.quotationId,
        quotationResId: quotationResId
       }
    });
  }
}

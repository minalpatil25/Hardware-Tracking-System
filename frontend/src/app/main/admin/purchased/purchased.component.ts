import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service.service';

export interface Purchase {
  id?: number;
  assetName: string;
  assetType: string;
  productSerialNo: string;
  vendorCode: string;
  cost: number;
  branch: string;
  date: Date;
  isVerified: boolean;
}

const ELEMENT_DATA: Purchase[] = [
  {id: 1, assetName: "Dell 1550", assetType: "CPU", productSerialNo: "ABR12R", cost: 100, branch: "Pune", date: new Date(), vendorCode: "DELLEXP", isVerified: false},
  {id: 2, assetName: "Dell 1550R", assetType: "Moniter", productSerialNo: "ABR143", cost: 200, branch: "Pune", date: new Date(), vendorCode: "DELLEXP", isVerified: true}
];  

@Component({
  selector: 'app-purchased',
  templateUrl: './purchased.component.html',
  styleUrls: ['./purchased.component.scss']
})
export class PurchasedComponent implements OnInit {

  page: string = "New Purchased";
  baseUri: string = "/purchase"

  displayedColumns: string[] = ['assetName', 'assetType', 'productSerialNo', 'vendorCode', 'branch', 'cost', 'date', 'isVerified'];
  dataSource = [];

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Purchase[]) => {
        this.dataSource = data;
        //data.map(ele => ele.type);
      },
      (err) => {
        console.log(err);
      }

    );
  }

}

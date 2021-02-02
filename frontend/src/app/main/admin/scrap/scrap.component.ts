import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service.service';

export interface Scrap {
  id?: number;
  productSerialNo: string;
  date: Date;
  reason: string;
  branch: string;
  isVerified: boolean;
}

const ELEMENT_DATA: Scrap[] = [
  {id: 1, productSerialNo: "ABR12R", reason: "Not starting", date: new Date(), branch: "Pune", isVerified: false},
  {id: 2, productSerialNo: "AB412R", reason: "Not starting", date: new Date(), branch: "Pune", isVerified: true}
];  

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss']
})
export class ScrapComponent implements OnInit {

  page: string = "Scrap Asset";
  baseUri: string = "/scrap"

  displayedColumns: string[] = ['productSerialNo', 'date', 'reason', 'branch', 'isVerified'];
  dataSource = ELEMENT_DATA;

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Scrap[]) => {
        this.dataSource = data;
        //data.map(ele => ele.type);
      },
      (err) => {
        console.log(err);
      }

    );
  }


  
  }



import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http-service.service';

export interface Maintenance {
  id?: number;
  assetName: string;
  assetType: string;
  productSerialNo: string;
  problem: string;
  newPart: string;
  serviceName: string;
  cost: number;
  venue: string;
  inwordDate: Date;
  outwordDate: Date;
  isVerified: boolean;
}

const ELEMENT_DATA: Maintenance[] = [
  { id: 1, assetName: "Dell 1550", assetType: "CPU", productSerialNo: "ABR12R", problem: "Not starting", newPart: "None", serviceName: "Dell service", cost: 200, venue: "Pune", inwordDate: new Date(), outwordDate: new Date(), isVerified: false },
  { id: 2, assetName: "Dell 1550R", assetType: "Moniter", productSerialNo: "ABR143", problem: "Not starting", newPart: "None", serviceName: "Dell service", cost: 100, venue: "Pune", inwordDate: new Date(), outwordDate: new Date(), isVerified: true }
];

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  //checked: boolean;
  isVerified: boolean;
  page: string = "Maintenance";
  baseUri: string = "/maintenance"
  maintenanceUri: string = "/isVerifiedmaintenance"

  displayedColumns: string[] = ['assetName', 'assetType', 'productSerialNo', 'problem', 'newPart', 'serviceName', 'cost', 'venue', 'inwordDate', 'outwordDate', 'isVerified'];
  dataSource = [];

  constructor(public httpService: HttpService) { }



  //this.httpService.get().subscribe
  ngOnInit(): void {
    this.httpService.get(this.baseUri).subscribe(
      (data: Maintenance[]) => {
        this.dataSource = data;

        //data.map(ele => ele.type);
      },
      (err) => {
        console.log(err);
      }

    );
  }

  verified(id, isVerified) {

    if (isVerified) {
      isVerified = false;
    } else {
      isVerified = true;
    }

    var body = {
      isVerified: isVerified
    }
    this.httpService.put(this.maintenanceUri,id,body).subscribe(
       (data:Maintenance[])=>
       {
         let tempDatasourse=this.dataSource.filter(ele =>ele.id!=id);
          tempDatasourse.push(data);
          this.dataSource=tempDatasourse;
          console.log(this.dataSource);
       },
       (err) => {
        console.log(err);
      }
    
    );
  }
}

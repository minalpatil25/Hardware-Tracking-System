import { Component, OnInit } from '@angular/core';

export interface Depreciation {
  id?: number;
  assetName: string;
  productSerialNo: string;
  cost: number;
  date: Date;
  depreciation: number;
  deprecatedValue: number;
  remainingValue: number;
}

const ELEMENT_DATA: Depreciation[] = [
  {id: 1, assetName: "Dell 1550", productSerialNo: "ABR12R", cost: 100, date: new Date(), depreciation: 20, deprecatedValue: 0, remainingValue: 100},
  {id: 2, assetName: "Dell 1550R", productSerialNo: "ABR143", cost: 200, date: new Date(), depreciation: 10, deprecatedValue: 0, remainingValue: 200}
];  

@Component({
  selector: 'app-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrls: ['./depreciation.component.scss']
})
export class DepreciationComponent implements OnInit {

  page: string = "Depreciation";

  displayedColumns: string[] = ['productSerialNo', 'assetName', 'date', 'depreciation', 'cost', 'deprecatedValue', 'remainingValue'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}

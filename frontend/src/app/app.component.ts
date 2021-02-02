import { Component, ViewChild } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTree} from '@angular/material/tree';
import { ChangePasswordComponent } from './layout/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { FormResult } from './layout/form-dialog/form-dialog.component';
import { FormActions } from './util/ui-labels';
import { HttpService } from './service/http-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface IMNode {
  name: string;
  url?: string;
  children?: IMNode[];
}

const ADMIN_TREE_DATA: IMNode[] = [
  {
    name: 'Master',
    children: [
      {name: 'Branch', url: 'admin/branch'},
      {name: 'User', url: 'admin/user'},
      {name: 'Vender', url: 'admin/vender'},
      {name: 'Asset Type', url: 'admin/assettype'}
    ]
  }, {
    name: 'Verification',
    children: [
      {name: 'Maintenance', url: 'admin/maintenance'},
      {name: 'Purchased', url: 'admin/purchased'},
      {name: 'Scrap', url: 'admin/scrap'}
    ]
  }, {
    name: 'Request',
    children: [
      {name: 'Quotation Request', url: 'admin/quotationrequest'},
      {name: 'Quotation Response', url: 'admin/quotationresponse'},
      {name: 'Purchase Order', url: 'admin/purchaseorder'}
    ]
  }
];
const USER_TREE_DATA: IMNode[] = [
  
  {
    name: 'Tasks',
    children: [
      {name: 'Maintenance', url: 'user/maintenance'},
      {name: 'Transfer', url: 'user/transfer'},
      {name: 'Purchased', url: 'user/purchased'},
      {name: 'Scrap', url: 'user/scrap'}
    ]
  },  {
    name: 'Report',
    children: [
      {name: 'Depreciation', url: 'user/depreciation'}
    ]
  }
  
];

const VENDOR_TREE_DATA: IMNode[] = [
  
  {
    name: 'Tasks',
    children: [
      {name: 'Quotation Response', url: 'vendor/quotationresponse'},
      {name: 'Purchase Order', url: 'vendor/purchaseorder'}
    ]
  }
];

/** Flat node with expandable and level information */
interface IMFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url?: string;
  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'invetory-manage';
  //show=false;
  private _transformer = (node: IMNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url
    };
  }

  treeControl = new FlatTreeControl<IMFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public dialog: MatDialog, public httpService:HttpService,public router:Router,public authService: AuthServiceService) {
    this.dataSource.data = [];
  }

  hasChild = (_: number, node: IMFlatNode) => node.expandable;

  ngOnInit() {
    this.authService.loginSub.subscribe(() => {
      if(this.authService.role == "admin"){
        this.dataSource.data=ADMIN_TREE_DATA;
      }
      
      if(this.authService.role == "user"){
        this.dataSource.data=USER_TREE_DATA;
      }

      if(this.authService.role == "vender"){
        this.dataSource.data=VENDOR_TREE_DATA;
      }

      this.treeControl.expandAll();
    });
  }

  logout()
  {
    this.httpService.show=false;
    sessionStorage.removeItem(this.authService.USER_NAME_SESSION_ATTRIBUTE_NAME);
    
    this.router.navigate(['/']);
    this.authService.username  = null;
    this.authService.password  = null;
    this.authService.username1 = null;

  }

  openChangePasswordDialog() 
  {
      let dialogRef = this.dialog.open(ChangePasswordComponent, {
      height: '450px',
      width: '500px'
       
      });

    dialogRef.afterClosed().subscribe(res => {
      let result: FormResult = res;
      if (result.action == FormActions.CHANGE) {
        console.log(res);
      }
    });
  }
}

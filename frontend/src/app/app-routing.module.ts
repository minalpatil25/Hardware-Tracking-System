import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './main/admin/branch/branch.component';
import { UserComponent } from './main/admin/user/user.component';
import { VenderComponent } from './main/admin/vender/vender.component';
import { AssettypeComponent } from './main/admin/assettype/assettype.component';
import { MaintenanceComponent as AdminMaintenanceComponent } from './main/admin/maintenance/maintenance.component';
import { MaintenanceComponent as UserMaintenanceComponent } from './main/user/maintenance/maintenance.component';
import { PurchasedComponent as AdminPurchasedComponent } from './main/admin/purchased/purchased.component';
import { PurchasedComponent as UserPurchasedComponent } from './main/user/purchased/purchased.component';
import { ScrapComponent as AdminScrapComponent } from './main/admin/scrap/scrap.component';
import { ScrapComponent as UserScrapComponent } from './main/user/scrap/scrap.component';
import { TransferComponent } from './main/user/transfer/transfer.component';
import { DepreciationComponent } from './main/user/depreciation/depreciation.component';
import { LoginComponent } from './main/login/login.component';
import { QuotationrequestComponent } from './main/admin/quotationrequest/quotationrequest.component';
import { QreqdetailComponent } from './main/admin/quotationrequest/qreqdetail/qreqdetail.component';
import { QuotationresponseComponent as VendorQuotationresponseComponent } from './main/vendor/quotationresponse/quotationresponse.component';
import { QresdetailComponent as VendorQresdetailComponent } from './main/vendor/quotationresponse/qresdetail/qresdetail.component';
import { QreslistComponent } from './main/admin/quotationresponse/qreslist/qreslist.component';
import { QuotationresponseComponent as AdminQuotationresponseComponent } from './main/admin/quotationresponse/quotationresponse.component';
import { QresdetailComponent as AdminQresdetailComponent } from './main/admin/quotationresponse/qresdetail/qresdetail.component';
import { PurchaseorderComponent as AdminPurchaseorderComponent } from './main/admin/purchaseorder/purchaseorder.component';
import { PodetailComponent as AdminPodetailComponent } from './main/admin/purchaseorder/podetail/podetail.component';
import { PurchaseorderComponent as VendorPurchaseorderComponent } from './main/vendor/purchaseorder/purchaseorder.component';
import { PodetailComponent as VendorPodetailComponent } from './main/vendor/purchaseorder/podetail/podetail.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    children: [
      {
        path: 'branch', 
        component: BranchComponent
      },
      {
        path: 'user', 
        component: UserComponent
      },
      {
        path: 'vender', 
        component: VenderComponent
      },
      {
        path: 'assettype', 
        component: AssettypeComponent
      },
      {
        path: 'maintenance', 
        component: AdminMaintenanceComponent
      },
      {
        path: 'purchased', 
        component: AdminPurchasedComponent
      },
      {
        path: 'scrap', 
        component: AdminScrapComponent
      },
      {
        path: 'quotationrequest',
        children: [
          {
            path: '', 
            component: QuotationrequestComponent
          },
          {
            path: 'qreqdetail', 
            component: QreqdetailComponent
          }
        ]
      },
      {
        path: 'quotationresponse',
        children: [
          {
            path: '', 
            component: AdminQuotationresponseComponent
          },
          {
            path: 'qreslist',
            children: [
              {
                path: '', 
                component: QreslistComponent
              },
              {
                path: 'qresdetail', 
                component: AdminQresdetailComponent
              }
            ]
          }
        ]
      },
      {
        path: 'purchaseorder',
        children: [
          {
            path: '', 
            component: AdminPurchaseorderComponent
          },
          {
            path: 'podetail', 
            component: AdminPodetailComponent
          }
        ]
      }
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: 'maintenance', 
        component: UserMaintenanceComponent
      },
      {
        path: 'purchased', 
        component: UserPurchasedComponent
      },
      {
        path: 'transfer', 
        component: TransferComponent
      },
      {
        path: 'scrap', 
        component: UserScrapComponent
      },
      {
        path: 'depreciation', 
        component: DepreciationComponent
      }
    ]
  },
  {
    path: 'vendor',
    children: [
      {
        path: 'quotationresponse',
        children: [
          {
            path: '', 
            component: VendorQuotationresponseComponent
          },
          {
            path: 'qresdetail', 
            component: VendorQresdetailComponent
          }
        ]
      },
      {
        path: 'purchaseorder',
        children: [
          {
            path: '', 
            component: VendorPurchaseorderComponent
          },
          {
            path: 'podetail', 
            component: VendorPodetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './layout/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BranchComponent } from './main/admin/branch/branch.component';
import { UserComponent } from './main/admin/user/user.component';
import { VenderComponent } from './main/admin/vender/vender.component';
import { AssettypeComponent } from './main/admin/assettype/assettype.component';
import { TransferComponent } from './main/user/transfer/transfer.component';
import { MaintenanceComponent as AdminMaintenanceComponent } from './main/admin/maintenance/maintenance.component';
import { MaintenanceComponent as UserMaintenanceComponent } from './main/user/maintenance/maintenance.component';
import { PurchasedComponent as AdminPurchasedComponent } from './main/admin/purchased/purchased.component';
import { PurchasedComponent as UserPurchasedComponent, PurchasedComponent } from './main/user/purchased/purchased.component';
import { ScrapComponent as AdminScrapComponent } from './main/admin/scrap/scrap.component';
import { ScrapComponent as UserScrapComponent } from './main/user/scrap/scrap.component';
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

@NgModule({
  declarations: [
    AppComponent,
    BranchComponent,
    UserComponent,
    VenderComponent,
    AssettypeComponent,
    AdminMaintenanceComponent,
    AdminPurchasedComponent,
    AdminScrapComponent,
    UserScrapComponent,
    TransferComponent,
    UserMaintenanceComponent,
    UserPurchasedComponent,
    DepreciationComponent,
    LoginComponent,
    QuotationrequestComponent,
    QreqdetailComponent,
    VendorQuotationresponseComponent,
    VendorQresdetailComponent,
    AdminQuotationresponseComponent,
    AdminQresdetailComponent,
    QreslistComponent,
    AdminPurchaseorderComponent,
    AdminPodetailComponent,
    VendorPurchaseorderComponent,
    VendorPodetailComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false, height: '600px', width: '800px'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { MessageBoxComponent } from './dynamic-form/components/message-box/message-box.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Form
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FormButtonComponent } from './dynamic-form/components/form-button/form-button.component';
import { FormInputComponent } from './dynamic-form/components/form-input/form-input.component';
import { FormSelectComponent } from './dynamic-form/components/form-select/form-select.component';
import { FormRadioButtonComponent } from './dynamic-form/components/form-radio-button/form-radio-button.component';
import { FormCheckboxComponent } from './dynamic-form/components/form-checkbox/form-checkbox.component';
import { FormTextareaComponent } from './dynamic-form/components/form-textarea/form-textarea.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
//import { FormDatepickerComponent } from './dynamic-form/components/form-datepicker/form-datepicker.component';
import { MatNativeDateModule } from '@angular/material/core';
//import { FormTimepickerComponent } from './dynamic-form/components/form-timepicker/form-timepicker.component';
import { MatIconModule } from '@angular/material/icon'
import { FlexLayoutModule } from '@angular/flex-layout';
//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormIdComponent } from './dynamic-form/components/form-id/form-id.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormDatepickerComponent } from './dynamic-form/components/form-datepicker/form-datepicker.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormRadioButtonComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    MessageBoxComponent,
    FormDatepickerComponent,
    //FormTimepickerComponent,
    FormIdComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
   // OwlNativeDateTimeModule,
    MatIconModule,
    FlexLayoutModule,
   // OwlDateTimeModule,
    MatTabsModule,
    RouterModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    DynamicFormComponent,
    MessageBoxComponent,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  providers: [ DatePipe ]
})
export class CoreModule { }

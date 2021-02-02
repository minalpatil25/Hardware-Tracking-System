import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss']
})
export class FormDatepickerComponent implements OnInit {
 
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  message: string;

  ngOnInit() {
    if(this.config.useCurrentDate && !this.config.value) {
      let currentDate = new Date();
      currentDate.setHours(0,0,0,0);
      this.group.controls[this.config.name].setValue(currentDate);
    } else if(this.config.useTomorrowDate && !this.config.value) {
      let currentDate = new Date();
      currentDate.setHours(0,0,0,0);
      let tomorowDate = new Date(currentDate.getTime() + 86400000);
      this.group.controls[this.config.name].setValue(tomorowDate);
    } else if(this.config.value) {
      let date = new Date(this.config.value);
      this.group.controls[this.config.name].setValue(date);
    }
  }

  isValid(_control, _validators): boolean {
    if (!_control || (!_control.dirty && !_control.touched)) {
      return true;
    }

    if (!_validators) {
      return true;
    }

    for (var i = 0; i < _validators.length; i++) {
      if (_control.hasError(_validators[i].key)) {
        this.message = _validators[i].value;
        return false;
      }
    }

    return true;
  }
}

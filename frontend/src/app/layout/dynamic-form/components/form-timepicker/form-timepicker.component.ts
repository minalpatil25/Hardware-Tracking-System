import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-timepicker',
  templateUrl: './form-timepicker.component.html',
  styleUrls: ['./form-timepicker.component.scss']
})
export class FormTimepickerComponent {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  message: string;

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

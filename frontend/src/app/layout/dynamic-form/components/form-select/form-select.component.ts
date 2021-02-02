import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-select',
  styleUrls: ['form-select.component.scss'],
  templateUrl: './form-select.component.html'
})
export class FormSelectComponent implements Field {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;
 
  @Output() selChange: EventEmitter<any> = new EventEmitter<any>();

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

  onSelChange() {
    this.selChange.emit({
      controlName: this.config.name,
      value: this.group.controls[this.config.name].value
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements Field {
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

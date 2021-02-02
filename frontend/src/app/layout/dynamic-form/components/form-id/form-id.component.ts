import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'app-form-id',
  templateUrl: './form-id.component.html',
  styleUrls: ['./form-id.component.scss'],
})
export class FormIdComponent implements OnInit {
  @Input() config: FieldConfig;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {
    if(this.config.autoGenerateId && !this.config.value) {
      let prefix = this.config.autoGenerateIdPrefix ? this.config.autoGenerateIdPrefix : this.config.name;
      this.group.controls[this.config.name].setValue(prefix + (new Date().getTime()));
    }
  }

}

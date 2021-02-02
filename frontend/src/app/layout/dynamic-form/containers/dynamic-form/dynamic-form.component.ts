import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { Subscription } from 'rxjs';

@Component({
  exportAs: 'dynamicForm',
  selector: 'app-dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit {
  @Input()
  config: FieldConfig[] = [];

  @Input()
  showCloseButton?: boolean = false;

  @Input()
  showSaveButton?: boolean = false;

  @Input()
  action?: string;

  @Input()
  errorMessage?: string;

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  btnclick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  autoCompleteValueChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  attachDownload: EventEmitter<any> = new EventEmitter<any>();

  rowList = [];
  form: FormGroup;
  subscriptions: Subscription[] = []

  get controls() {
    return this.config.filter(({ type }) => type !== 'button');
  }
  get changes() {
    return this.form.valueChanges;
  }
  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.getRawValue();
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.config == null || this.config.length < 1) {
      return;
    }

    const groupBy = (array, key) => {
      // Return the end result
      return array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
          currentValue
        );
        // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
        return result;
      }, {}); // empty object is the initial value for result object
    };

    // Group by rowIndex as key to the config array
    const list = groupBy(this.config, 'rowIndex');

    this.rowList = Object.keys(list).map(function (rowIndex) {
      const row = list[rowIndex];
      return row;
    });
  }

  ngOnChanges() {
      this.form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control =>
      group.addControl(control.name, this.createControl(control))
    );
    return group;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  handleClose() {
    this.close.emit('close');
  }

  btnClick(_btnName) {
    this.btnclick.emit(_btnName);
  }

  setDisabled(name: string, disable: boolean) {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map(item => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  onAutoCompleteKeyUp(event) {
    console.log('under dynamic form');
    
    this.autoCompleteValueChange.emit(event);
  }

  onSelChange(controlEvent) {
    //this.eventService.publish(EventNames.ON_SELECTION_CHANGE, appEvent);
  }

  attachDownloadSave() {
    this.attachDownload.emit();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

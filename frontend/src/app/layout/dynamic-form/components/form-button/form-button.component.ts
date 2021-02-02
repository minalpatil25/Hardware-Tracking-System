import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-button',
  styleUrls: ['form-button.component.scss'],
  templateUrl: './form-button.component.html'
})
export class FormButtonComponent {
  @Input() name: string;
  @Input() disabled?: boolean;
  @Input() group: FormGroup;
  @Input() fill: string = 'solid';

  @Output() closeForm: EventEmitter<any> = new EventEmitter<any>();

  onCloseClick() {
    this.closeForm.emit('close');
  }
}

import { Component, OnInit, Input } from '@angular/core';

/**
 * Component to display error/info/warn/success messages on the form
 */
@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  errorMessage: string;

  constructor() { }

  ngOnInit() {}

  @Input() set errorMsg(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

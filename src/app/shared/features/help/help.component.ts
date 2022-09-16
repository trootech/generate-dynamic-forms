import { Component, OnInit } from '@angular/core';
import { MessageContent } from '../../model/message-content';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  messageContent = new MessageContent();

  constructor() { }

  ngOnInit() {
  }

}

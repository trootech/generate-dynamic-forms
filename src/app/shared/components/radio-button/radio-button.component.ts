import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @Input() type: any;
  @Input() value:any;
  @Input() for:any;
  @Input() name:any;
  @Input() text:any;
  @Input() formControlName:any;
  @Output() radioChange:EventEmitter<string>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onRadioChange(event:any){
    this.radioChange.emit(event);  
  }

}

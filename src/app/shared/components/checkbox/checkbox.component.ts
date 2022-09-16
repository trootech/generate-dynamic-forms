import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() type: any;
  @Input() value:any;
  @Input() for:any;
  @Input() text:any;
  @Input() name:any;
  @Input() formControlName:any;
  @Output() checkBOxChange:EventEmitter<string>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChangeCheckBoxValue(event:any){
    this.checkBOxChange.emit(event);  
  }

}

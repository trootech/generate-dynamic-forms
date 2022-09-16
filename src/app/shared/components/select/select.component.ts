import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() name:any;
  @Input() type:any;
  @Input() text:any;
  @Input() for:any;
  @Input() value:any;
  @Input() label:any;
  @Input() formControlName:any;
  @Input() selectedValue:any;
  @Output() selectVAlueChange:EventEmitter<string>= new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  onChangeSelectValue(event:any){
    this.selectVAlueChange.emit(event);  
  }
}

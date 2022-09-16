import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() type: any;
  @Input() value:any;
  @Input() formControlName:any;
  @Output() textChange:EventEmitter<string>= new EventEmitter();
 
  constructor() { }
  ngOnInit(): void {
  }

  onChangeText(event:any){ 
    this.textChange.emit(event);  
  }

}

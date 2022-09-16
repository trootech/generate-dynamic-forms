import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() type:any;
  @Input() formControlName:any;
  @Output() fileChangevalue:EventEmitter<string>= new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  OnChangeFile(event:any){
    this.fileChangevalue.emit(event);  
  }

}

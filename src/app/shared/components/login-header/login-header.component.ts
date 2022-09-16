import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { MessageContent } from '../../model/message-content';


@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss']
})
export class LoginHeaderComponent implements OnInit {
  parent:any;
  headermenu : boolean = false;
  authObj:any;
  userRole:any;
  messageContent = new MessageContent();
  constructor(private router:Router,private actroute:ActivatedRoute,private formService:FormService) {  
 
  }


 
  ngOnInit() {

   
    
  }

  
}

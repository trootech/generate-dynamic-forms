import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { MessageContent } from '../../model/message-content';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  parent:any;
  headermenu : boolean = false;
  authObj:any;
  userRole:any;
  messageContent = new MessageContent();
  firstLatter:any;
  showDiv = {
    previous : false,
  }
  closeResult: string = '';
  selectedFile: File;

  letters = '0123456789ABCDEF';
  color = '#';

  @Output() imagefilechange:EventEmitter<string>= new EventEmitter();
  url:any;
  imagedata : boolean = false
  profile: any;

  constructor(private router:Router,
              private actroute:ActivatedRoute,
              private formService:FormService,
              private modalService: NgbModal,
              private authService:AuthService,) {
  }

  checkuser(){
    const userid = localStorage.getItem("userid")
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('profile_image', this.selectedFile);
    this.authService.UpdateProfileImage(uploadData)
      .subscribe(
        res => {
          if (res) {
            this.formService.showSuccess(this.messageContent.UploadProfile, this.messageContent.sucessMessageTitle)
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event) => { // called once readAsDataURL is completed
              this.url = event.target.result;
              this.imagedata = true
            }
          }
        },
        error => {
          this.formService.showError(error.error.message, this.messageContent.errorMessageTitle)
        });
  }


getprofileinfo(){
  this.authService.getprofileinfo()
  .subscribe(
    res => {
      if (res) {
        this.profile = res['profile_image']              
      }
    },
    error => {
      this.formService.showError(error.error.message, this.messageContent.errorMessageTitle)
    });
}


  ngOnInit() {
    this.getprofileinfo()
    var retrievedObject = localStorage.getItem('authObject');
    this.authObj = JSON.parse(retrievedObject);
    this.userRole = this.authObj.user_role.split("_")[1];
    this.firstLatter = this.authObj.name ? this.authObj.name.charAt(0).toUpperCase() : '';
    this.getRandomColor();

  }

  logoutUser(){
      this.formService.logout().subscribe((res) => {
      this.router.navigate(['/login']);
      localStorage.removeItem('authObject');
      localStorage.clear();
      this.formService.showSuccess(this.messageContent.logoutSuccessMessage,this.messageContent.sucessMessageTitle);
      },
      err=> {
        console.log(err)
      })
  }

  open(content:any ) {
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }

   getRandomColor() {
      this.color = '#'; // <-----------
        for (var i = 0; i < 6; i++) {
            this.color += this.letters[Math.floor(Math.random() * 16)];
        }
    }

   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}

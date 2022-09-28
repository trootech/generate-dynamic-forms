import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormService } from '../../services/form.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessageContent } from '../../model/message-content';
import { PlatformLocation } from '@angular/common';
import { environment } from 'src/environments/environment.prod';


export interface FormData {
  id: string;
  name: string;
  action: string;

}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  deleteId = '';
  displayedColumns : string[] = ['id', 'form_name', 'actions'];
  dataSource = new MatTableDataSource<FormData>();
  expandedElement: FormData | null;
  formDataList:any;
  counter:any;
  enabled : any;
  authObj:any;
  userRole:any;
  url: any;
  messageContent = new MessageContent();
  isLoading = false;
  constructor(
    private formService: FormService,
    private modalService: NgbModal,
    private route: Router,
  ) {

  }

  ngOnInit(): void {
    var retrievedObject = localStorage.getItem('authObject');
    this.authObj = JSON.parse(retrievedObject);
    this.userRole = this.authObj.user_role.split("_")[1];
    this.getFormList();
  }

  getFormList() {
    this.isLoading = true;
    this.formService.getFormDataList().subscribe((res:any) => {
      if(res && res.data) {
          this.isLoading = false;
          // this.formDataList =res.data;
          res.data.forEach((element, index) => {
            let id = index+1;
            element['id'] = id.toString();
          });
          this.dataSource = new MatTableDataSource(res.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource(null);
      }

		},
		err => {

      this.formDataList = err;
		})
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openConfirmationModel(model, id) {
    this.deleteId = id;
    this.modalService.open(model, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // console.log(`Closed with: ${result}`);
    }, (reason) => {
      // console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });

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

  deleteForm() {

      this.formService.deleteForm(this.deleteId).subscribe({
        next: (res) =>  this.getFormList(),
        error: (err) =>  console.log(err)
      });
  }

  myfunction(event: any){
    this.enabled = event.target.classList[0]

  }

  navigateTOForm(id:any){
    if (this.enabled) {
        this.showToasterInfo()
        this.enabled = undefined
    }
    else {
      this.route.navigate(['form/', id]);
    }
  }

  showToasterInfo() {
    this.formService.showInfo('This is info', 'No data Found');
  }

  copyInputMessage(element:any){
    var resquestUrl = environment.base_url+'forms/by/?id='+element
    navigator.clipboard.writeText(resquestUrl);
    this.formService.showSuccess(this.messageContent.copyData,this.messageContent.sucessMessageTitle);
  }
}

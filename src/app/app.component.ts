import { Component } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pick-or-grab'
  isAuth = false;
  constructor(
    private router:Router
  ) {
    this.router.events.subscribe((routerData) => {
      if (routerData instanceof ResolveEnd) {
        let parent = routerData.url
        if (parent == '/' || parent == '/register' || parent == '/login' || parent == '/forget-password' ) {
          this.isAuth = false;
        }
        else{
          this.isAuth = true         
        }
      }
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    // this.isAuth 
  }

}

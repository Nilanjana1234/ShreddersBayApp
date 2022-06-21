import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  id: any;
  userData: any;
  name: any;
  email: any;
  filename: any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }
 
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
    this.name=this.userData[0].name;
    this.email=this.userData[0].email;
    this.filename=this.userData[0].profile;
   // alert(this.filename);
  }
  myProfile(){
    this.router.navigate(['my-profile']);
  }
  myAddr(){
    this.router.navigate(['my-addr']);
  }

  settings(){
    this.router.navigate(['settings']);
  }


  logout(){
    this.router.navigate(['logout']);
  }

  changePass(){
    this.router.navigate(['change-pass']);
  }
  notifications(){
    this.router.navigate(['notifications']);
  }

}

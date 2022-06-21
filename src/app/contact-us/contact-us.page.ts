import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  userData: any;
  id: any;
  role:any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    this.role=this.userData[0].user_role;
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
  }
  notifications(){
    if(this.role==3){
      this.router.navigate(['auction-home/notifications'])
    }
    else if(this.role==1){
      this.router.navigate(['dealer-home/dealer-home/notifications']);
    }
    else{
      this.router.navigate(['notifications']);
    }
    
  }
  faqs(){
    if(this.role==3){
      this.router.navigate(['auction-home/faqs'])
    }
    else if(this.role==1){
      this.router.navigate(['dealer-home/dealer-home/faqs']);
    }
    else{
    this.router.navigate(['faqs']);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { UserApiService } from '../services/user-api.service';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  role: any;
  data: any;
  list: any;
  faqArr: any;
  show: any;
  user_id: any;
  userDetails: any;
  constructor(
    private userService: UserApiService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }


  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.role=this.userDetails[0].user_role;
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.getAllFaq();
  }

  getAllFaq()
  {
     this.userService.getAllFaq().toPromise().then((res)=>{
    this.data=res;

     }).catch((err)=>{
       console.log('Error' + err)
     })
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

}

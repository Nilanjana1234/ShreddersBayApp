import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.page.html',
  styleUrls: ['./frontend.page.scss'],
})
export class FrontendPage implements OnInit {
  data: any;
  user1: boolean=false;
  auction1:boolean=false;
  constructor(
    private router: Router,
    public userApiService: UserApiService,
  ) { }

  ngOnInit() {

  }
   home(val){
     this.router.navigate(['home', {role:val}]);
  }

user(){
  this.user1=!this.user1;
  if(this.auction1==true){
    this.auction1=false;
  }
}

auctionshow(){
   this.auction1=!this.auction1;
   if(this.user1==true){
    this.user1=false;
  }
}
auction(val){
  this.router.navigate(['auction-login', {role:val}]);
}
}

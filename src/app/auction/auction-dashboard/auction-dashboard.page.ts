import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
@Component({
  selector: 'app-auction-dashboard',
  templateUrl: './auction-dashboard.page.html',
  styleUrls: ['./auction-dashboard.page.scss'],
})
export class AuctionDashboardPage implements OnInit {
  userDetails:any;
  role:any;
  userId:any;
  name:any;
  data:any;
  datalength:any;
  Days:any
  data1:any;
  datalength1:any
  constructor(private router:Router, public userService: UserApiService) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.name=this.userDetails[0].name;
    this.role=this.userDetails[0].user_role;
    if(this.userDetails ==null || this.role!=3){
      this.router.navigate(['frontend']);
    }
    this.userId=this.userDetails[0].id;
    this.countauction()

  }
  myAuction(){
    this.router.navigate(['auction-home/my-auction']);
  }
  create(){
    this.router.navigate(['auction-home/create-auction']);
  }
  countauction(){
    this.userService.getAuction().toPromise().then((res) => {

      this.data = res;
      this.datalength = this.data.length
    })
    var formdata: any = new FormData();
    formdata.append('user_id', this.userId)
    this.userService.getCurrentAuctions(formdata).toPromise().then((res) => {

      this.data1 = res;
      this.datalength1 = this.data1.length

    })
  }
  allauction(){
    this.router.navigate(['auction-home/all-auction'])

  }

}

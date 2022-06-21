import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-available-auction',
  templateUrl: './available-auction.page.html',
  styleUrls: ['./available-auction.page.scss'],
})
export class AvailableAuctionPage implements OnInit {
  userDetails: any;
  user_id: any;
  orders: any;

  constructor(private userService: UserApiService,
    private router: Router) { }

  ngOnInit() {
   // alert('hello');
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userDetails[0].id;
    this.availableBooking();

  }

  availableBooking(){
    this.userService.getAuction().toPromise().then((res) => {
     // console.log(res);
      this.orders = res;
    //  this.orders=this.orders.slice(0,4);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  ignore(auction_id){
    // this.userService.updateStatus(this.user_id, myFormData).toPromise().then((res) => {
    //   console.log(res);
    //   this.orders = res;
    //   //this.orders = this.orders;
    //   this.orders=this.orders.slice(0,4);
    // }).catch((err) => {
    //   console.log('Error' + err);
    // });
  }

  accept(auction_id){
    // Initialize Params Object
   // alert(auction_id);
 var myFormData = new FormData();
 // Begin assigning parameters
 myFormData.append('user_id',this.user_id);
 myFormData.append('auction_id',auction_id);
    this.userService.updateAuctionStatus(myFormData).toPromise().then((res) => {
     // console.log(res);
      this.orders = res;
      this.router.navigate(['current-auction']);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }
  singleAuctionDetail(auction_id){

      this.router.navigate(['single-auction-detail',{auction_id}]);

   }

}

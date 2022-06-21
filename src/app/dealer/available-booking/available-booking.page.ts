import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RateTheAppPageRoutingModule } from 'src/app/customer/rate-the-app/rate-the-app-routing.module';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-available-booking',
  templateUrl: './available-booking.page.html',
  styleUrls: ['./available-booking.page.scss'],
})
export class AvailableBookingPage implements OnInit {
  userDetails: any;
  user_id: any;
  orders: any;
  val:any;
  show=true;
  show1=false;
  data:any;
  booking_id:any;
  uid:any;
  userorderid:any;
  uidorder:any;
  land:any;
  data1:any;
  newval:any
  constructor(private userService: UserApiService,
    private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userDetails[0].id;
    this.availableBooking();

  }

  availableBooking(){
    this.userService.getAllOrders().toPromise().then((res) => {
      console.log(res)
      this.orders = res;
    //  this.orders=this.orders.slice(0,4);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  ignore(book_id){
    // this.userService.updateStatus(this.user_id, myFormData).toPromise().then((res) => {
    //   console.log(res);
    //   this.orders = res;
    //   //this.orders = this.orders;
    //   this.orders=this.orders.slice(0,4);
    // }).catch((err) => {
    //   console.log('Error' + err);
    // });
  }

  accept(book_id){
    // Initialize Params Object
 var myFormData = new FormData();
 // Begin assigning parameters
 myFormData.append('user_id',this.user_id);
 myFormData.append('booking_id',book_id);
    this.userService.updateStatus(myFormData).toPromise().then((res) => {
      this.orders = res;
      this.router.navigate(['dealer-home/dealer-home/dealer-booking']);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  // getValue(val1:any)
  // {

  //    this.show=false;
  //    this.show1=true;
  //    this.val=val1;
  //    console.log(this.val)
  //   var formdata = new FormData();
  //   formdata.append('pin_code',this.val);
  //   console.log(formdata)
  //   this.userService.getOrdersByPincode(formdata).toPromise().then((res) => {
  //     this.data = res;
  //     console.log(res);

  //    }).catch((err) => {
  //     console.log('Error' + err);

  //   });

  // }

  // newValue(newval1:any){
  //   this.newval=newval1

  // }


  //  original()
  // {
  //   this.show1=false;
  //   this.show=true;

  //   this.availableBooking();
  // }
  singleOrderDetail(book_id){

      this.router.navigate(['single-order-detail',{book_id}]);

   }


}

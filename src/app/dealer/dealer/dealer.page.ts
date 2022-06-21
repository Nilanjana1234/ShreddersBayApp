import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.page.html',
  styleUrls: ['./dealer.page.scss'],
})
export class DealerPage implements OnInit {
  data: any;
  list: any;
  orders: any;
  userDetails: any;
  user_id: any;
  slider: any;
  slideOptsOne: any;
  constructor(private userService: UserApiService,
    private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userDetails[0].id;
    this.getProducts();
    this.availableBooking();
    this.slideOptsOne = {
      initialSlide: 0,
      slidesPerView: 1,
      autoplay:true
     };
  }

  getProducts() {

    this.userService.getProducts().toPromise().then((res) => {
      //console.log(res);
      this.data = res;
      //this.list = this.data.slice(0, 4);
    }).catch((err) => {
      console.log('Error' + err);
    });

  }

  availableBooking(){
    this.userService.getAllOrders().toPromise().then((res) => {
      console.log(res);
      this.orders = res;
      //this.orders = this.orders;
      this.orders=this.orders.slice(0,3);
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
  singleOrderDetail(book_id){

     this.router.navigate(['single-order-detail',{book_id}]);

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
}

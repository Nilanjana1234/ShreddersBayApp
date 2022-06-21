import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserApiService } from '../../services/user-api.service';
@Component({
  selector: 'app-my-addr',
  templateUrl: './my-addr.page.html',
  styleUrls: ['./my-addr.page.scss'],
})
export class MyAddrPage implements OnInit {
  user_id: any;
  userData: any;
  name: any;
  email: any;
  role: any;
  data: any;
  successMsg: string;
  errorMsg: string;
  addr_id: any;
  approxPrice: any;
  prodId: any;
  weight: any;
  cartId: any;
  filename: any;
  dateTime: any;
  bookingDate: any;
  adderr=false;
  constructor(
    public userService: UserApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
     this.dateTime = this.activateRoute.snapshot.params.schedule_date;
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userData[0].id;
    this.name = this.userData[0].name;
    this.email = this.userData[0].email;
    this.getAddress();
  }
  notifications() {
    this.router.navigate(['notifications']);
  }



  getAddress() {
    this.userService.getAddress(this.user_id).toPromise().then((res) => {
      console.log(res);
      this.data = res;
    }).catch((err) => {
      console.log('Error' + err);
    });
  }
  address($event) {
    //alert($event.detail.value);
    this.addr_id = $event.detail.value;
  }

  placeRequest() {
    if(this.addr_id ==null){
      this.adderr=true;
    }
   else{
    const dValue = new Date();
    this.bookingDate = formatDate(dValue, 'yyyy-MM-dd', 'en-US');
    // Initialize Params Object
    var myFormData = new FormData();
    this.userService.getCartById(this.user_id).toPromise().then((res) => {
      res.forEach((value) => {
        this.approxPrice = value.total_price;
        this.prodId = value.prod_id;
        this.weight = value.total_weight;
        this.cartId = value.cart_id;
        this.filename = value.filename;
      });

      // Begin assigning parameters
      myFormData.append('user_id', this.user_id);
      myFormData.append('prod_id', this.prodId);
      myFormData.append('approx_weight', this.weight);
      myFormData.append('booking_date', this.bookingDate);
      myFormData.append('schedule_date', this.dateTime);
      myFormData.append('approx_price', this.approxPrice);
      myFormData.append('filename', this.filename);
      myFormData.append('addr_id', this.addr_id);
      // console.log( this.orderDetails);
      this.userService.createOrder(myFormData).toPromise().then((res) => {
        this.userService.openToast('Request Placed Successfully');
       // this.successMsg = 'Request Placed Successfully';
        this.router.navigate(['customer-home/customer-home/my-booking']).then(() => {
          window.location.reload();
        });
      }).catch((err) => {
        this.userService.openToast(err.error);
      });
    }).catch((err) => {
      console.log('Your Cart Is Empty' + err);
    });
  }
  }

  plus() {
    this.router.navigate(['customer-home/customer-home/scrap-items']);
  }

  addAddr() {
    this.router.navigate(['add-address', {'schedule_date': this.dateTime}]);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getAddress();
    }, 2000);
  }

  editAddr(addr_id){
  //  alert(addr_id);
   this.router.navigate(['add-address',{'addr_id':addr_id}])

  }
  delAddr(addr_id){
 //   alert(addr_id);
    const formData = new FormData();
    formData.append('id',addr_id);
    this.userService.delAddressById(formData).toPromise().then((res) => {
    this.getAddress();
   //  this.router.navigate(['add-address'])
    }).catch((err) => {
      console.log('Error' + err);
    });

  }
}


import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserApiService } from '../../services/user-api.service';
@Component({
  selector: 'app-auction-addr',
  templateUrl: './auction-addr.page.html',
  styleUrls: ['./auction-addr.page.scss'],
})
export class AuctionAddrPage implements OnInit {

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
  adderr = false;
  naddr_id: string = '';
  view = false;
  addressname: any;
  data1: any;
  data2: any;
  file: any
  constructor(
    public userService: UserApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
    this.dateTime = this.activateRoute.snapshot.params.schedule_date;

    if (this.userData == null) {
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
    if (this.addr_id == null) {
      this.adderr = true;
    }
    else {
      const dValue = new Date();
      this.bookingDate = formatDate(dValue, 'yyyy-MM-dd', 'en-US');
      // Initialize Params Object
      var myFormData = new FormData();
      this.userService.getAuctionCartById(this.user_id).toPromise().then((res) => {

        this.approxPrice = res[0].total_price;
        this.prodId = res[0].prod_id;
        this.weight = res[0].total_weight;
        this.cartId = res[0].cart_id;
        this.filename = res[0].filename;
        console.log(res)

        // Begin assigning parameters
        myFormData.append('user_id', this.user_id);  //done
        myFormData.append('prod_id', this.prodId);  //done
        myFormData.append('approx_weight', this.weight);  //done
        myFormData.append('booking_date', this.bookingDate); //done
        myFormData.append('schedule_date', this.dateTime);  //done
        myFormData.append('end_date', this.dateTime) //done
        myFormData.append('approx_price', this.approxPrice); //done
        myFormData.append('filename', this.filename);  //done
        myFormData.append('addr_id', this.addr_id);  //done
        console.log(myFormData);
        this.userService.orderAuction(myFormData).toPromise().then((res) => {
          this.userService.openToast('Request Placed Successfully');
          // this.successMsg = 'Request Placed Successfully';
          console.log("Request Placed Successfully")
          this.router.navigate(['auction-home/all-auction']).then(() => {
            // window.location.reload();
          });
        }).catch((err) => {
          this.userService.openToast(err.error);
          console.log(err)
        });
      }).catch((err) => {
        console.log('Your Cart Is Empty' + err);
      });
    }
  }



  addAddr() {
    this.router.navigate(['auction-home/auction-add-addr', { 'schedule_date': this.dateTime }]);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getAddress();
    }, 2000);
  }

  editAddr(addr_id) {
    //  alert(addr_id);
    this.router.navigate(['auction-home/auction-add-addr', { 'addr_id': addr_id, 'schedule_date': this.dateTime }])

  }
  delAddr(addr_id) {
    //   alert(addr_id);
    const formData = new FormData();
    formData.append('id', addr_id);
    this.userService.delAddressById(formData).toPromise().then((res) => {
      this.getAddress();
      //  this.router.navigate(['add-address'])
    }).catch((err) => {
      console.log('Error' + err);
    });

  }

  viewGetAddr() {
    this.naddr_id = "Click on Order Summary to see Updated Address";
    this.adderr = false;
  }

  viewOrder() {
    if (this.addr_id == null) {
      this.adderr = true;
    }
    else {
      this.naddr_id = '';
      this.adderr = false;
      this.view = true;
      this.userService.getAddressById(this.addr_id).toPromise().then((res) => {

        this.data1 = res;
        this.addressname = this.data1.address;

      }).catch((err) => {
        console.log('Error' + err);
      });

      this.userService.getAuctionCartById(this.user_id).toPromise().then((res) => {
        this.data2 = res;
        this.file = this.data2[0].filename
        console.log(res)

        this.approxPrice = this.data2[0].price * this.data2[0].total_weight;

      }).catch((err) => {
        console.log('Your Cart Is Empty' + err);
      });
    }
  }

}

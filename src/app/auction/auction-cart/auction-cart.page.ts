import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { UserApiService } from 'src/app/services/user-api.service';
@Component({
  selector: 'app-auction-cart',
  templateUrl: './auction-cart.page.html',
  styleUrls: ['./auction-cart.page.scss'],
})
export class AuctionCartPage implements OnInit {

  userDetails: any;
  userId: any;
  data: any;
  message: any;
  approxPrice: any;
  dateTime: any;
  successMsg: string;
  errorMsg: string;
  prodId: any;
  price: any;
  bookingDate: any;
  weight: any;
  cartId: any;
  filename: string | Blob;
  scherr:string;
  show=false;

  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController
    ) {}

  ngOnInit() {

     this.pastDateTime();

    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
   // alert(this.userDetails);
   this.getCartById()
  }
  min:any;
pastDateTime(){
  var tdate:any = new Date();
  console.log(tdate);

  var date:any =tdate.getDate();
  if(date < 10)
  {
    date = "0" +date;
  }
  var month:any =tdate.getMonth();

  if(month < 10){
    month = "0" + (month + 1);
  } console.log(month)

  var year:any = tdate.getFullYear();
  console.log(year)
  var hours:any=tdate.getHours();
  var minutes:any = tdate.getMinutes()
  console.log(hours);
  console.log(minutes)
  this.min= year + "-" + month + "-" + date + "T" + hours + ":" + minutes;
  console.log(this.min)

}

onChange(value:any){

    var todate:any = new Date();
    var selectDate:any = new Date(value);
    if (todate > selectDate){
      this.dateTime="";
      this.show=true;
      this.scherr="*Previous Date is not Allowed"
    }
}

  removeCart(cart_id) {
    this.userService.deleteAuctionItem(this.userId).toPromise().then((res) => {
      this.message = res;
      this.userService.openToast(this.message.message);

      this.router.navigate(['auction-home/auction-cart']).then(() => {
        window.location.reload();
      });
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCartById() {


    this.userService.getAuctionCartById(this.userId).toPromise().then((res) => {
      this.data = res;
 console.log(res)

        this.approxPrice = this.data[0].price*this.data[0].total_weight;

    }).catch((err) => {
      console.log('Your Cart Is Empty'+err);
    });
  }


  addAddr() {
    if(this.dateTime!=undefined && this.dateTime!=""){
      this.show=false;
    this.router.navigate(['auction-home/auction-addr', {schedule_date: this.dateTime}]);
    }
    else{
      this.show=true;
      this.scherr="*Schedule Date is Required"
    }
  }

  plus(){
    this.router.navigate(['auction-home/create-auction']);
  }

  doRefresh(event:any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getCartById();
    }, 2000);
  }



}

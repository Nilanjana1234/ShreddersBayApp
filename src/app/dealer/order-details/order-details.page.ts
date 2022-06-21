import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  userDetails: any;
  bId: any;
  data: any;
  user_id: any;
  confirm: any;

  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private activateRouter: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userDetails[0].id;
    // this.role = this.userDetails[0].user_role;
    // alert(this.role);

    this.bId = this.activateRouter.snapshot.params.bookingId;
    this.getOrdersById();
  }

  getOrdersById() {
    const formdata =new FormData();
    formdata.append('booking_id',this.bId);
    this.userService.getOrdersById(formdata).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }


  getCancelOrders() {
    const formdata =new FormData();
    formdata.append('booking_id',this.bId);
    this.userService.getCanOrders(formdata).toPromise().then((res) => {
      this.data = res;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  delivered()
  {
    var formData = new FormData();
    formData.append('booking_id',this.bId);
      this.userService.completed(formData).toPromise().then((res) => {
        this.data = res;
        this.router.navigate(['dealer-home/dealer-home/dealer-booking']);
      }).catch((err) => {
        console.log('Error' + err.error);
      });
  }

cancel(){
  var formData = new FormData();
  formData.append('booking_id', this.bId);
  this.userService.Confirm().then((res)=>{
    this.confirm=res;
    if( this.confirm ) {
  this.userService.cancel(formData).toPromise().then((res) => {
    this.data = res;
    this.router.navigate(['dealer-home/dealer-home/dealer-booking']);
  }).catch((err) => {
    console.log('Error' + err.error);
  });
    }

});
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-single-order-detail',
  templateUrl: './single-order-detail.page.html',
  styleUrls: ['./single-order-detail.page.scss'],
})
export class SingleOrderDetailPage implements OnInit {

  userDetails: any;
  book_id: any;
  data: any;
  user_id: any;
  confirm: any;
  booking_id: any;

  constructor( private userService: UserApiService,
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

    this.book_id = this.activateRouter.snapshot.params.book_id;
    // alert(this.book_id);
    this.getOrdersById(this.book_id);
  }
  getOrdersById(book_id) {
    const formdata =new FormData();
    formdata.append('booking_id',book_id);
    this.userService.getOrdersById(formdata).toPromise().then((res) => {
      this.data = res;
      this.booking_id = this.data[0].booking_id;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-single-auction-detail',
  templateUrl: './single-auction-detail.page.html',
  styleUrls: ['./single-auction-detail.page.scss'],
})
export class SingleAuctionDetailPage implements OnInit {

  userDetails: any;
  auction_id: any;
  data: any;
  user_id: any;
  confirm: any;
  auct_id:any;

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

    this.auct_id = this.activateRouter.snapshot.params.auction_id;
   // alert(this.auct_id);
    this.getAuctionById(this.auct_id);
  }
  getAuctionById(auct_id) {
    const formdata =new FormData();
    formdata.append('auction_id',auct_id);
    this.userService.getAuctionById(formdata).toPromise().then((res) => {
      this.data = res;
      this.auction_id = this.data[0].auction_id;
      console.log(this.data);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }


}

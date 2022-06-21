import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
  providers: [NavParams],

})
export class CustomerPage implements OnInit {
  role: any;
  data: any;
  list: any;
  userDetails: any;
  userId: any;


  constructor(
    private userService: UserApiService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
    this.getProducts();

  }
  getProducts(){
    this.userService.getProducts().toPromise().then((res) => {
      console.log(res);
      this.data=res;
      // this.list=this.data.slice(0,9);
      this.list=this.data;
    }).catch((err)=> {
      console.log('Error' + err);
    });

  }

  addCart()
  {
    this.router.navigate(['customer-home/customer-home/scrap-items']);
  }

  notifications(){
    this.router.navigate(['notifications']);
  }
}



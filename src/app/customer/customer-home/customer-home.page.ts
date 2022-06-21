import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.page.html',
  styleUrls: ['./customer-home.page.scss'],
})
export class CustomerHomePage implements OnInit {
 public tabs = [
    { title: 'Home', url: 'customer', icon: 'home' },
    { title: 'Create Order', url: 'scrap-items', icon: 'mail' },
    { title: 'My Cart', url: 'my-cart', icon: 'cart' },
    { title: 'My Bookings', url: 'my-booking', icon: 'book' },
    { title: 'My Account', url: 'my-account', icon: 'person' },
  ];
  userDetails: any;
  userId: any;
  role:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    //this.role=this.userDetails[0].user_role;
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
  }

}

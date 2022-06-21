import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {


  appPages = [
    { title: 'Home', url: 'customer-home/customer-home/customer', icon: 'home' },
    { title: 'Create Scrap Items', url: 'customer-home/customer-home/scrap-items', icon: 'create' },
    { title: 'My Cart', url: 'customer-home/customer-home/my-cart', icon: 'cart' },
    { title: 'My Booking', url: 'customer-home/customer-home/my-booking', icon: 'book' },
    { title: 'All Action', url: 'all-auction', icon: 'book' },
    { title: 'My Action', url: 'my-auction', icon: 'book' },
    { title: 'My Account', url: 'customer-home/customer-home/my-account', icon: 'person' },
    { title: 'Notifications', url: 'notifications', icon: 'mail' },
    { title: 'Rate the App', url: 'rate-the-app', icon: 'star' },
    { title: 'FAQ', url: 'faqs', icon: 'help' },
    { title: 'Terms & Conditions', url: 'terms-conditions', icon: 'newspaper' },
    { title: 'Contact Us', url: 'contact-us', icon: 'call' },
    { title: 'Logout', url: 'logout', icon: 'power' }
  ];
  userData: any;
  dateTime: any;
  activateRoute: any;
  router: any;
  user_id: any;
  name: any;
  email: any;
  profile: any;

  constructor() {

  }

  ngOnInit(): void {
  if(localStorage.getItem('userDetails')){
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
    this.name=this.userData[0].name;
   // this.role=this.userData[0].user_role;
    if(this.userData ==null ){
      this.router.navigate(['frontend']);
    }
    this.user_id = this.userData[0].id;
  }

    }


}

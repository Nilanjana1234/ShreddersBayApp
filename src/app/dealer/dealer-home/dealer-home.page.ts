import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-home',
  templateUrl: './dealer-home.page.html',
  styleUrls: ['./dealer-home.page.scss'],
})
export class DealerHomePage implements OnInit {

  sideNav = [
    {title : 'Home', url : '/dealer-home/dealer-home/dealer', icon: 'home'},
    {title : 'Available Booking', url : '/dealer-home/dealer-home/available-booking', icon: 'book'},
    {title : 'My Booking', url : '/dealer-home/dealer-home/dealer-booking', icon: 'book'},
    {title : 'My Account', url : '/dealer-home/dealer-home/my-account', icon: 'person'},
    { title: 'All Action', url: 'all-auction', icon: 'book' },
    { title: 'My Action', url: 'my-auction', icon: 'book' },
    {title : 'Notification', url : '/dealer-home/dealer-home/notifications', icon: 'notifications'},
    {title : 'FAQ', url : '/dealer-home/dealer-home/faqs', icon: 'help'},
    {title : 'Terms & Conditions', url : '/dealer-home/dealer-home/terms-conditions', icon: 'newspaper'},
    {title : 'Contact Us', url : '/dealer-home/dealer-home/contact-us', icon: 'call'},
    {title : 'Logout', url : '/dealer-home/dealer-home/logout', icon: 'power'},
  ];
  userDetails: any;
  userId: any;
  name: any;
  role: any;


  constructor(private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.name=this.userDetails[0].name;
   // this.role=this.userDetails[0].user_role;
    if(this.userDetails ==null ){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
  }

}

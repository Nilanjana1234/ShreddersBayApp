import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.page.html',
  styleUrls: ['./auction-home.page.scss'],
})
export class AuctionHomePage implements OnInit {

 
  auctionNav = [
    {title : 'Dashboard', url : '/auction-home/auction-dashboard', icon: 'home'},
    {title : 'Create Auction', url : '/auction-home/create-auction', icon: 'create'},
    {title : 'My Cart', url : '/auction-home/auction-cart', icon: 'cart'},
    {title : 'My Auction', url : '/auction-home/my-auction', icon: 'book'},
    {title : 'All Auction', url: '/auction-home/all-auction', icon: 'book'},
    {title : 'My Account', url : '/auction-home/my-account', icon: 'person'},
    {title : 'Notification', url : '/auction-home/notifications', icon: 'notifications'},
    {title : 'FAQ', url : '/auction-home/faqs', icon: 'help'},
    {title : 'Terms & Conditions', url : '/auction-home/terms-conditions', icon: 'newspaper'},
    {title : 'Contact Us', url : '/auction-home/contact-us', icon: 'call'},
    {title : 'Logout', url : '/logout', icon: 'power'},
  ];
  userDetails: any;
  userId: any;
  name: any;
  role:any;
  constructor(private router:Router) { }

  ngOnInit() {    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
  this.name=this.userDetails[0].name;
 // this.role=this.userDetails[0].user_role;
  if(this.userDetails ==null ){
    this.router.navigate(['frontend']);
  }
  this.userId = this.userDetails[0].id;
  }

}

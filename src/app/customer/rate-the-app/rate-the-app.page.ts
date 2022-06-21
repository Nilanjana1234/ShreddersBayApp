import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-the-app',
  templateUrl: './rate-the-app.page.html',
  styleUrls: ['./rate-the-app.page.scss'],
})
export class RateTheAppPage implements OnInit {
  userDetails: any;
  userId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;
    window.open("https://play.google.com/store/apps/details?id=com.fil.shredders");
    this.router.navigate(['/customer-home/customer-home/customer']);
  }

}

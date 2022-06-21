import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  role: any;
  data: any;
  userData: any;
  id: any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute) { }
  ngOnInit() {
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
    // this.getNotifications();

  }
  // getNotifications() {

  //   this.apiService.getNotifications().toPromise().then((res) => {
  //     console.log(res);
  //     this.data = res;
  //   }).catch((err) => {
  //     console.log('Error' + err);
  //   });

  // }
}

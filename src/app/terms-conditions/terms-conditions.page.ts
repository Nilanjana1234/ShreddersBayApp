import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss'],
})
export class TermsConditionsPage implements OnInit {
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
    this.getTermsConditions();

  }
  getTermsConditions() {

    // this.apiService.getTermsConditions().toPromise().then((res) => {
    //   console.log(res);
    //   this.data = res[0].description;
    // }).catch((err) => {
    //   console.log('Error' + err);
    // });

  }

}

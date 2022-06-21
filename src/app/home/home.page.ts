import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavParams } from '@ionic/angular';
import { Facebook, FacebookLoginResponse,  } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
 providers: [NavParams]
})
export class HomePage implements OnInit {

  role: any;
  isLoggedIn = false;
  users: any;
  name: any;
  email: any;
  givenName: any;
  id: any;
  picture: any;
  token: any;
  displayName: any;
  familyName: any;
  userId: any;
  imageUrl: any;
  data: any;

  constructor(
    public navParams: NavParams,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private facebook: Facebook,
    private googlePlus: GooglePlus,
    private userService: UserApiService

    ) {
    facebook.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === 'connect') {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
  }
  login(role){
    //alert(role);
    this.router.navigate(['login', {role}]);
 }
 loginotp(role)
 {
   this.router.navigate(['mobile',{role}]);
 }
 signup(role){
  //alert(role);
  this.router.navigate(['signup', {role}]);
}

fbLogin() {
  alert("This Feature Will Comming Soon");
  this.facebook.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => alert('Logged into Facebook!=='+ JSON.stringify(res)))
  .catch(e => console.log('Error logging into Facebook', e));
  this.facebook.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
}

getUserDetail(userid: any) {
  this.facebook.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
    .then(res => {
      console.log(res);
      this.users = res;
     // alert(this.users);
      this.name = this.users[0].name;
      this.email = this.users[0].email;
      this.givenName = this.users[0].givenName;
      this.id = this.users[0].userId;
      this.picture = this.users[0].imageUrl;
      this.token = this.users[0].token;
      const formData = new FormData();
      formData.append('facebook_id',this.id);
      formData.append('name',this.name);
      formData.append('email',this.id);
      formData.append('givenName',this.givenName);
      formData.append('profile_pic', this.picture);
      formData.append('token',this.token);
      this.userService.create(this.users).toPromise().then((response)=>{
        console.log(response);
      }).catch((err)=>{
        console.log(err);
      });
    }).catch(e => {
      console.log(e);
    });
}


googleSignIn() {

  // this.googlePlus.login({})
  // .then(res => alert(JSON.stringify(res)))
  // .catch(err => alert(JSON.stringify(err)));

  this.googlePlus.login({}).then(res => {
    this.users=res;
      this.name = this.users.displayName;
      this.email = this.users.email;
     // alert(this.name);
      this.givenName = this.users.givenName;
      this.id = this.users.userId;
      this.picture = this.users.imageUrl;
      this.token = this.users.accessToken;
      const formData = new FormData();
      formData.append('role',this.role);
      formData.append('google_id',this.id);
      formData.append('name',this.name);
      formData.append('email',this.email);
      //formData.append('givenName',this.givenName);
      formData.append('profile_pic', this.picture);
      formData.append('token',this.token);
      this.userService.googleLogin(formData).toPromise().then((response)=>{
        this.data=response;
        //alert(JSON.stringify(this.data));
        if(response){

          if (this.role == 1) {
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            this.router.navigate(['dealer-home']);
            this.userService.openToast('Login Successfully...');
          }
          if (this.role == 0) {
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            this.router.navigate(['customer-home/customer-home/customer']);
            this.userService.openToast('Login Successfully...');

          }
        }
      }).catch((err)=>{
       // alert(JSON.stringify(err));
      });
    })
    .catch(e => alert('Error logging into Google'+ e));
 }

}


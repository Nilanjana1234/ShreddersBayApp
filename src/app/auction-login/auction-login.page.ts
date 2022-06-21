import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-auction-login',
  templateUrl: './auction-login.page.html',
  styleUrls: ['./auction-login.page.scss'],
})
export class AuctionLoginPage implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  data: any;
  role: any;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;
  isSubmitted1: boolean;
  message: string;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  toggle:boolean;
  passval=false;
  userDetails:any;
  constructor(
    private userService: UserApiService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;

    console.log(this.role)
    this.isSubmitted = false;
    this.isSubmitted1 = false;
    this.toggle = true
    this.loginForm = this.fb.group({
      role: [this.role],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{3,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      password: ['', [Validators.required]],

    });
    this.signupForm = this.fb.group({
      role: [this.role],
       name: ['',[Validators.required, Validators.minLength(2), Validators.pattern('^(?!.{1} )[a-zA-Z ]*')]],
       email: ['',[Validators.email, Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{3,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
       password: ['',[Validators.required, Validators.minLength(8), Validators.pattern('(?!.* )(?=^.{8,}$)(?=.*[0-9])(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$')]],
       confPass: ['',[Validators.required] ],
       mobile: ['',[Validators.required, Validators.pattern('^[0-9].{9}$')]],
     },

     );
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  get errorControl1() {
    return this.signupForm.controls;
  }



  submitForm() {
    this.isSubmitted1 = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      // Initialize Params Object
      var myFormData = new FormData();
      // Begin assigning parameters
      myFormData.append('role', this.role);
      myFormData.append('email', this.loginForm.value.email);
      myFormData.append('password', this.loginForm.value.password);
      console.log(this.loginForm.value.email)
      this.userService.auctionLoginUp(myFormData).toPromise().then((res) => {
        this.data = res;
        console.log(this.data.message);
        if (this.data.message=='User Not Exist') {
          this.data.message='User not Exist or Verify account to continue..';
          this.userService.openToast(this.data.message);
        }
        if (this.data.message=='Incorrect Password') {
          this.userService.openToast(this.data.message);
        }else{
          if (this.role == 3 && this.data[0].user_role == 3) {
            this.loginForm.reset();
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            this.router.navigate(['auction-home/auction-dashboard',{'role':this.role}]);
            this.message='Login Successfully...';
            this.userService.openToast(this.message);
          }
          if (this.role == 4 && this.data[0].user_role == 4) {
            this.loginForm.reset();
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            this.router.navigate(['auction-home/auction-dashboard',{'role':this.role}]);
            this.message='Login Successfully...';
            this.userService.openToast(this.message);

          }
        }
      }).catch(err => {
        // this.errorMsg = error.message;
       // this.errorMsg = 'User Not Exist';
       this.data.message='User not Exist or Verify account to continue..';
       this.userService.openToast(this.data.message);
        this.successMsg = '';
        console.log(err.message);
        this.loginForm.reset();
        this.signupForm.reset();
      });
    }
  }
  forgetPassword(){
//alert(this.role);
this.router.navigate(['forget-password', {'role':this.role}]);
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
toggleForm(){
  this.toggle=!this.toggle;
}

signupSubmitForm(){
  this.isSubmitted = true;
  if (!this.signupForm.valid) {
    console.log('Please provide all the required values!')
    return false;
  } else {

    if(this.signupForm.value.password==this.signupForm.value.confPass)
    {
      this.passval=false;
    // Initialize Params Object
  var myFormData = new FormData();
  // Begin assigning parameters
  console.log(this.role)
  myFormData.append('role', this.role);
  myFormData.append('name', this.signupForm.value.name);
  myFormData.append('email', this.signupForm.value.email);
  myFormData.append('mobile', this.signupForm.value.mobile);
  myFormData.append('password', this.signupForm.value.password);
  console.log(this.signupForm.value.email);
  this.userService.auctionSignUp(myFormData).subscribe((res: Response) => {
    console.log(res);
    this.data = res;
    if(this.data.message){
      this.userService.openToast(this.data.message);
    }
   // alert(this.data.message);
    this.router.navigate(['auction-login']);
  });
  }
  else {
    this.passval=true;
  }
}
}

}

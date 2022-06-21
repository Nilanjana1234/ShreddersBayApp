import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  data: any;
  role: any;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;
  message: string;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    private userService: UserApiService,
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
    this.isSubmitted = false;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{3,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      password: ['', [Validators.required]],

    });
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
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
      this.userService.getByUserInfo(myFormData).toPromise().then((res) => {
        this.data = res;
        console.log(this.data[0]);
        if (this.data.message=='Incorrect Password') {
          this.userService.openToast(this.data.message);
        }else{
          if (this.role == 1 && this.data[0].user_role == 1) {
            this.loginForm.reset();
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            this.router.navigate(['dealer-home']);
            this.message='Login Successfully...';
            this.userService.openToast(this.message);
          }
          if (this.role == 0 && this.data[0].user_role == 0) {
            this.loginForm.reset();
            localStorage.setItem('userDetails', JSON.stringify(this.data));
            this.router.navigate(['customer-home/customer-home/customer']);
            this.message='Login Successfully...';
            this.userService.openToast(this.message);

          }
        }
      }).catch(err => {
        // this.errorMsg = error.message;
      //  this.errorMsg = 'User Not Exist';
      this.data.message='User not Exist or Verify account to continue..';
      this.userService.openToast(this.data.message);
        this.successMsg = '';
        console.log(err.message);
       // this.loginForm.reset();
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

}

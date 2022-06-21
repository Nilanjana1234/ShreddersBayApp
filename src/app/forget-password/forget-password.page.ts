import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserApiService } from '../services/user-api.service';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';
// import { SMS } from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  resetForm: FormGroup;
  data: any;
  role: any;
  errorMsg: string;
  successMsg: string;
  isSubmitted: boolean;
  message: string;
  userData: any;
  mail:any;
   constructor(
    private router: Router,
    public fb: FormBuilder,
    private userService: UserApiService,
    private activateRoute: ActivatedRoute,
    public toastCtrl: ToastController

  ) { }
  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
    this.isSubmitted = false;
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{3,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],

    });
  }
  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }
  get errorControl() {
    return this.resetForm.controls;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.resetForm.valid) {
      console.log('Please Enter Email!')
      return false;
    } else {
      var myFormData = new FormData();
      myFormData.append('role', this.role);
      myFormData.append('email', this.resetForm.value.email);
       console.log(myFormData);
      this.userService.forgetPassword(myFormData).toPromise().then((res) => {
        this.data = res;
        console.log(this.data[0]);
        if (this.data.message) {
          console.log(this.data.message)
          this.openToast(this.data.message);
        }
        else {
          this.errorMsg = 'Worng Email';
        }
      }).catch(err => {
        // this.errorMsg = error.message;
       // this.errorMsg = 'Worng Email';
        this.successMsg = '';
        console.log(err.message);
      //  this.resetForm.reset();
      });
    }
  }


}

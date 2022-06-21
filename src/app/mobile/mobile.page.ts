import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.page.html',
  styleUrls: ['./mobile.page.scss'],
})
export class MobilePage implements OnInit {

  otpForm: FormGroup;
  role:any
   data:any
   errorMsg: string;
   successMsg: string;
   isSubmitted: boolean;
   message: string;

  constructor(
    public fb: FormBuilder,
    private userService: UserApiService,
    private activateRoute: ActivatedRoute,
    public toastCtrl: ToastController,

    private router: Router,) { }

  ngOnInit() {
    this.role = this.activateRoute.snapshot.params.role;
    this.isSubmitted = false;
    this.otpForm = this.fb.group({
      numb: ['', [Validators.required, Validators.pattern('^[0-9].{9}$')]],

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
    return this.otpForm.controls;
  }

  getOtpData()
  {
    this.isSubmitted = true;
    if (!this.otpForm.valid) {
      console.log('Please Enter Mobile!')
      return false;
    }else {
    var myFormData = new FormData();
      myFormData.append('role', this.role);
      myFormData.append('mobile', this.otpForm.value.numb);

       console.log(myFormData)
      this.userService.getOtpMobile(myFormData).toPromise().then((res) => {
        this.data = res;
        console.log(this.data[0]);
        if (this.data.message) {
          this.openToast(this.data.message);
        }
        else{
          this.errorMsg = 'Wrong Mobile';
        }
      }).catch(err => {
        // this.errorMsg = error.message;
      //  this.errorMsg = 'Worng Mobile';
        this.successMsg = '';
        console.log(err.message);
        this.otpForm.reset();
      });
    }
  }
  login(){
    //alert(this.role);
    this.router.navigate(['login', {'role':this.role}]);
      }
}

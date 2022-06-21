import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  userDetails: any;
  userId: any;
  country: any;
  submitForm: FormGroup;
  isSubmitted: boolean;
  country_id: any;
  state: any;
  state_id: any;
  city: any;
  city_id: any;
  area: any;
  area_id: any;
  successMsg: string;
  errorMsg: string;
  dateTime: any;
  data: any;
  addr_id: any;
  address: any;
  landmark: any;
  pin_code: any;
  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.addrs_id = this.activateRoute.snapshot.params.addr_id;
    //alert(this.addrs_id);
    this.dateTime = this.activateRoute.snapshot.params.schedule_date;
    this.userId = this.userDetails[0].id;
    this.submitForm = this.fb.group({
      country_id: ['',[Validators.required]],
      state_id: ['',[Validators.required]],
      city_id: ['',[Validators.required]],
      area_id: ['',[Validators.required]],
      address: ['',[Validators.required, Validators.pattern('^(?!.{0} )[a-zA-Z0-9 ]*')]],
      landmark: ['',[Validators.required, Validators.pattern('^(?!.{0} )[a-zA-Z0-9 ]*')]],
      pincode: ['',[Validators.required]],
    });
    this.getCountry();
    this.get_add();
  }
  get errorControl() {
    return this.submitForm.controls;
  }
  getCountry(){
    this.userService.getCountry().toPromise().then((res) => {
      this.country = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getState($event){
    this.country_id=$event.detail.value;
    this.userService.getState(this.country_id).toPromise().then((res) => {
      this.state = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getCity($event){
    this.state_id=$event.detail.value;
    this.userService.getCity(this.state_id).toPromise().then((res) => {
      this.city = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  getArea($event){
    this.city_id=$event.detail.value;
    this.userService.getArea(this.city_id).toPromise().then((res) => {
      this.area = res;
      console.log(res);
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  valueChange($event){
    this.area_id=$event.detail.value;
  }


  submitForms() {
    this.isSubmitted = true;
    if (!this.submitForm.valid) {
      return false;
    } else {
      // Initialize Params Object
      var myFormData = new FormData();
      //Begin assigning parameters
      myFormData.append('user_id', this.userId);
      myFormData.append('country_id', this.country_id);
      myFormData.append('state_id', this.state_id);
      myFormData.append('city_id', this.city_id);
      myFormData.append('area_id', this.area_id);
      myFormData.append('address', this.submitForm.value.address);
      myFormData.append('landmark', this.submitForm.value.landmark);
      myFormData.append('pincode', this.submitForm.value.pincode);
      //alert(this.country_id);
     // console.log(myFormData);
      this.userService.addAddress(myFormData).toPromise().then((res) => {
       // alert(res);
        this.successMsg = 'Address Added Successfully';
        this.userService.openToast(this.successMsg);
        if(this.dateTime){
          this.router.navigate(['my-addr', {'schedule_date': this.dateTime}]).then(() => {
            window.location.reload();
          });
        }
        else{
        this.router.navigate(['my-addr']).then(() => {
          window.location.reload();
        });
        }
      }).catch((err) => {
        //alert('Error' + err.Error);
        console.log('Error' + err);
      });
    }

  }



  get_add(){
    this.userService.getAddressById(this.addrs_id).toPromise().then((res) => {
      console.log(res);
      this.data = res;
  this.addr_id = this.data[0].addr_id;
  this.address = this.data[0].address;
  this.country_id = this.data[0].country_id;
  this.state_id = this.data[0].state_id;
  this.area_id = this.data[0].area_id;
  this.city_id = this.data[0].city_id;
  this.landmark = this.data[0].landmark;
  this.pin_code = this.data[0].pin_code;

    }).catch((err) => {
      console.log('Error' + err);
    });

  }
  addrs_id(addrs_id: any) {
    throw new Error('Method not implemented.');
  }
}

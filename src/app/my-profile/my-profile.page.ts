import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from 'src/app/services/user-api.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
  [x: string]: any;
  profileForm: FormGroup;
  id: any;
  userData: any;
  clickedImage: string;
  isSubmitted: boolean;
  image;
  imageData;
  // filename: string;
  // options: CameraOptions = {
  //   quality: 30,
  //   destinationType: this.camera.DestinationType.DATA_URL,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // }
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private userService: UserApiService,
    private camera: Camera,
    private http: HttpClient,
    private toastCtrl: ToastController


  ) { }

  ngOnInit() {
    this.isSubmitted = false;
    this.userData=JSON.parse(localStorage.getItem('userDetails'));
    if(this.userData ==null){
      this.router.navigate(['frontend']);
    }
    this.id=this.userData[0].id;
    this.name=this.userData[0].name;
    this.mobile=this.userData[0].mobile;
    this.email=this.userData[0].email;
    //alert(this.userData);
    this.profileForm = this.fb.group({
      name: [this.name,[Validators.required, Validators.minLength(2), Validators.pattern('^(?!.{1} )[a-zA-Z ]*')]],
      mobile: ['',[Validators.required, Validators.pattern('^[0-9].{9}$')]],
      email: ['',[Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{3,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
    });
  }

  get errorControl() {
    return this.profileForm.controls;
  }

  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  // fileChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (value) => {
  //       this.img1 = value.target.result;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);  // to trigger onload
  //   }
  //   const fileList: FileList = event.target.files;
  //   this.filename = fileList[0].name;

  //    this.file = fileList[0];
  //   console.log(this.file);

  // }


  // captureImage() {
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     //alert(imageData);
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clickedImage = base64Image;
  //    // alert(this.clickedImage);
  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });
  // }

  submitForm() {
    this.isSubmitted = true;
    //  console.log(this.profileForm.value);
      if (!this.profileForm.valid) {
        return false;
      } else {
        var myFormData = new FormData();
        //Begin assigning parameters
        myFormData.append('user_id', this.id);
        myFormData.append('name', this.profileForm.value.name);
        myFormData.append('email', this.profileForm.value.email);
        myFormData.append('mobile', this.profileForm.value.mobile);
        this.userService.updateProfile(myFormData).toPromise().then((res) => {
          this.successMsg = 'Profile Updated Successfully';
           this.userService.getUserById(this.id).toPromise().then((response) => {
             this.myUserData=(response);
           localStorage.setItem('userDetails', JSON.stringify(this.myUserData));

       location.reload();
      });


        });
      }
    }

  }

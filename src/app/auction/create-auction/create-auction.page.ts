import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from 'src/app/services/user-api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.page.html',
  styleUrls: ['./create-auction.page.scss'],
   providers: [Camera]
})
export class CreateAuctionPage implements OnInit {
  clickedImage: string;
  isSubmitted: boolean;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  filedel:boolean=false;
  data: any;
  list: any;
  id: any;
  userId: any;
  subProduct: any;
  weight: any;
  submitForm: FormGroup;
  price: any;
  img1: string | ArrayBuffer;
  userDetails: any;
  userName: any;
  prod_id: any;
  file: any;
  totalPrice: any;
  successMsg: string;
  errorMsg: string;
  //image to be displayed in template
  image;
  imageData;
  filename: string;

  constructor(
    private userService: UserApiService,
    public fb: FormBuilder,
    private router: Router,
    private camera: Camera,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }


  ngOnInit() {
    this.isSubmitted = false;


    this.prod_id = '';
    this.file = '';
    this.price = '';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(this.userDetails ==null){
      this.router.navigate(['frontend']);
    }
    this.userId = this.userDetails[0].id;

    // console.log(this.userDetails[0]);
    this.submitForm = this.fb.group({
      prodname : ['', Validators.required],
      subprodname : ['', Validators.required],
      user_id: [this.userId],
      prod_id: [this.prod_id],
      weight: ['',[Validators.required]],
      price: [''],
      file: ['',[Validators.required]]
    });

    this.getProducts();
  }
  get errorControl() {
    return this.submitForm.controls;
  }

  getProducts() {
    this.userService.getProducts().toPromise().then((res) => {
      //console.log(res);
      this.data = res;
    }).catch((err) => {
      console.log('Error' + err);
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


  checkValue(value:any) {
    console.log(value.detail.value);
    this.id = value.detail.value;
    const formData = new FormData();
    formData.append('p_id',this.id);
    this.userService.getProdById(formData).toPromise().then((res) => {
      this.list = res;
      console.log(this.list[0]);
      this.prod_id = this.list[0].p_id;
      this.subProduct = this.list[0].sub_name;
      this.weight = this.list[0].weight;
      this.price = this.list[0].price;
    }).catch((err) => {
      console.log('Error' + err);
    });
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (value) => {
        this.img1 = value.target.result;this.filedel=true;
      };
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    const fileList: FileList = event.target.files;
    this.filename = fileList[0].name;

     this.file = fileList[0];


  }

  delfile(event){
    this.filedel=false;
    this.file='';
    (<HTMLInputElement>document.getElementById('del')).value = "";
  }


  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      //alert(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
     // alert(this.clickedImage);
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  submitForms() {
  //  alert();
    this.isSubmitted = true;

    if (!this.submitForm.valid) {
      return false;
    } else {

      // Initialize Params Object
      var myFormData = new FormData();
      // Begin assigning parameters
      myFormData.append('user_id', this.userId);
      myFormData.append('prod_id', this.prod_id);
      myFormData.append('price', this.price);
      myFormData.append('weight', this.submitForm.value.weight);

      if(this.file){
        myFormData.append('file', this.file, this.filename);

      }
      if(this.clickedImage){
        myFormData.append('file', this.clickedImage, this.clickedImage);
      }
      this.userService.deleteAuctionItem(this.userId).toPromise().then((any)=>{
        console.log(myFormData);
        this.userService.createAuction(myFormData).toPromise().then((res) => {
        //  alert(res);

          this.submitForm.reset();

          this.successMsg = 'Item Added Successfully';
          this.openToast(this.successMsg);
          this.router.navigate(['auction-home/auction-cart']).then(() => {
            window.location.reload();
          });

        }).catch((err) => {
       //  alert(err);
          console.log('Error' + err);
          this.errorMsg = 'Error' + err;
        });
      });

    }

  }





  // openCamera() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageData = imageData;
  //     // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  //     this.image = (<any>window).Ionic.WebView.convertFileSrc(imageData);
  //   }, (err) => {
  //     // Handle error
  //     alert('error ' + JSON.stringify(err));
  //   });
  // }
  // upload() {
  //   const url = 'your REST API url';
  //   const date = new Date().valueOf();

  //   // Replace extension according to your media type
  //   const imageName = date + '.jpeg';
  //   // call method that creates a blob from dataUri
  //   const imageBlob = this.dataURItoBlob(this.imageData);
  //   const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });

  //   const postData = new FormData();
  //   postData.append('file', imageFile);

  //   const data: Observable<any> = this.http.post(url, postData);
  //   data.subscribe((result) => {
  //     console.log(result);
  //   });
  // }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

}

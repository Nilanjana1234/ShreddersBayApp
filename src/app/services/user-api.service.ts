import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
const userURL = 'http://shreddersbay.com/API/user_api.php?action=';
const prodURL = 'http://shreddersbay.com/API/product_api.php?action=';
const cartURL = 'http://shreddersbay.com/API/cart_api.php?action=';
const orderURL = 'http://shreddersbay.com/API/orders_api.php?action=';
const auctionURL = 'http://shreddersbay.com/API/auctioncart_api.php?action=';
const addrURL = 'http://shreddersbay.com/API/address_api.php?action=';
const countryURL = 'http://shreddersbay.com/API/country_api.php?action=';
const stateURL = 'http://shreddersbay.com/API/state_api.php?action=';
const cityURL = 'http://shreddersbay.com/API/city_api.php?action=';
const areaURL = 'http://shreddersbay.com/API/area_api.php?action=';
const addressURL = 'http://shreddersbay.com/API/address_api.php?action=';
const faqURL = 'http://shreddersbay.com/API/faqs_api.php?action=';
const auctionUserURL ='http://shreddersbay.com/API/auctionUser_api.php?action=';
const auctionOrderURL = 'http://shreddersbay.com/API/auctionOrder_api.php?action=';
const auctionChatURL = 'http://shreddersbay.com/API/auctionchat_api.php?action=';
const auctionSingleURL = 'http://shreddersbay.com/API/auction_api.php?action='
const notificationURL = 'http://shreddersbay.com/API/notification_api.php?action='
@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  httpHeaders: { headers: HttpHeaders; };
  constructor(private http: HttpClient, private alertController: AlertController, private toastCtrl: ToastController) {
    this.httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
}

googleLogin(myFormData): Observable<any> {
  return this.http.post(`${userURL}google_login`, myFormData)
}

getAuctionChat(id:number): Observable<any>{
  return this.http.get(`${auctionChatURL}select_id&auction_id=${id}`)
}

auctionChat(formdata): Observable<any> {
  return this.http.post(`${auctionChatURL}insert`,formdata)
}

auctionSignUp(myFormData): Observable<any> {
  console.log(myFormData);
  return this.http.post(`${auctionUserURL}auction_signup`, myFormData)
}

auctionLoginUp(myFormData): Observable<any> {
  console.log(myFormData);
  return this.http.post(`${auctionUserURL}auction_login`, myFormData)
}

 forgetPassword(myFormData): Observable<any> {

  console.log(myFormData);
  return this.http.post(`${userURL}forgot_Password`, myFormData)
 }

 getOtpMobile(myFormData): Observable<any> {
  return this.http.post(`${userURL}loginByOtp`,myFormData)
}

getAllFaq(): Observable<any> {
  return this.http.get(`${faqURL}select`);
}

// getOrdersByPincode(formdata): Observable<any> {
//   return this.http.post(`${orderURL}select_id`, formdata)
// }

getOrdersByPincode(formData): Observable<any> {
 // console.log(id)
    return this.http.post(`${orderURL}filter_by_address`,formData)
  }


  getAll(): Observable<any> {
    return this.http.get(`${userURL}select`);
  }
  //insert user
  create(myFormData): Observable<any> {
    return this.http.post(`${userURL}insert`, myFormData)
  }

  // update profile
  updateProfile(myFormData): Observable<any> {
    return this.http.post(`${userURL}edit`, myFormData)
  }
  // update password
  updatePassword(myFormData): Observable<any> {
    return this.http.post(`${userURL}reset_pass`, myFormData)
  }


 //select single user by id
 getUserById(id: number): Observable<any> {
  return this.http.get(`${userURL}select_id&user_id=${id}`)
}
  //select user
  getByUserInfo(myFormData): Observable<any> {
    return this.http.post(`${userURL}user_info`, myFormData)
  }

    //select Address By user Id
    getAddressById(id:any): Observable<any> {
      return this.http.get(`${addrURL}select_id&addr_id=${id}`);
    }
      //select Address By user Id
  delAddressById(formData): Observable<any> {
    return this.http.post(`${addrURL}delete&addr_id`,formData);
  }

  //select product
  getProducts(): Observable<any> {
    return this.http.get(`${prodURL}select`);
  }
  //select product
  getProdById(formData): Observable<any> {
    return this.http.post(`${prodURL}select_id`,formData)
  }

  createCart(myFormData){
    return this.http.post(`${cartURL}insert`, myFormData)
  }
  // create aution
  createAuction(myFormData){
    return this.http.post(`${auctionURL}insert`, myFormData)
  }
  //order placing auction
  orderAuction(myFormData){
     console.log(myFormData)

    return this.http.post(`${auctionOrderURL}insert`, myFormData)
  }
   //select auction by id
   getAuctionById(formData): Observable<any> {
    return this.http.post(`${auctionURL}select_id`,formData)
  }
  getAuctionCartById(id:number): Observable<any> {
    return this.http.get(`${auctionURL}select_id&user_id=${id}`)
  }

  getSingleAuction(formdata): Observable<any>{
    return this.http.post(`${auctionSingleURL}select_id`,formdata)
  }
  // get auction
  getAuction(): Observable<any> {
    return this.http.get(`${auctionOrderURL}select`);
  }
  //current auction
  getCurrentAuctions(formData): Observable<any> {
    return this.http.post(`${auctionOrderURL}select_current`,formData)
  }
  //get auction page's product by id
getAucProdById(formData): Observable<any> {
  return this.http.post(`${auctionURL}select_prod_id`,formData)
}
//update auction status

updateAuctionStatus(myFormData): Observable<any> {
  return this.http.post(`${auctionURL}accept`,myFormData)
}

  //GET COMPLETE AUCTION

  getCompleteAuctions(id: number): Observable<any> {
    return this.http.get(`${auctionURL}selectCustomerComplete&user_id=${id}`)
  }
// get cancel auction
getCancelAuctions(formdata): Observable<any> {
  return this.http.post(`${auctionOrderURL}select_cancel`,formdata)
}
// cancel aution

cancelAuction(formData): Observable<any> {
  return this.http.post(`${auctionOrderURL}cancel`,formData)
}

  getCartById(id: number): Observable<any> {
    return this.http.get(`${cartURL}select_id&user_id=${id}`)
  }


  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${cartURL}delete&cart_id=${id}`)
  }

  deleteAuctionItem(id: number): Observable<any> {
    return this.http.delete(`${auctionURL}clear_cart&user_id=${id}`)
  }
  createOrder(myFormData){
    return this.http.post(`${orderURL}insert`, myFormData)
  }

  getCurOrders(formdata): Observable<any> {
    return this.http.post(`${orderURL}select_current`,formdata)
  }

  getCanOrders(formdata): Observable<any> {
    return this.http.post(`${orderURL}select_cancel`,formdata)
  }

  getCompOrders(formdata): Observable<any> {
    return this.http.post(`${orderURL}select_complete`,formdata)
  }

  getCurrentOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}selectCustomerCurrent&user_id=${id}`)
  }

  getCompleteOrders(id: number): Observable<any> {
    return this.http.get(`${orderURL}selectCustomerComplete&user_id=${id}`)
  }

  getCancelOrders(id): Observable<any> {
    return this.http.get(`${orderURL}selectCustomerCancel&user_id=${id}`)
  }

  getOrdersById(formdata): Observable<any> {
    return this.http.post(`${orderURL}select_id`,formdata)
  }

  updateStatus(myFormData): Observable<any> {
    return this.http.post(`${orderURL}accept`,myFormData)
  }

  cancel(formData): Observable<any> {
    return this.http.post(`${orderURL}cancel`, formData)
  }

  completed(formData){
    return this.http.post(`${orderURL}complete`, formData)
  }

  cancelBooking(formData): Observable<any> {
    return this.http.post(`${orderURL}customer_cancel`,formData)
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${orderURL}select`);
  }

  //select Address By user Id
  getAddress(id: number): Observable<any> {
    return this.http.get(`${addrURL}AddrByUserId&user_id=${id}`);
  }

  getCountry(): Observable<any> {
    return this.http.get(`${countryURL}select`);
  }

  getState(id): Observable<any> {
    return this.http.get(`${stateURL}select&country_id=${id}`);
  }
  getCity(id): Observable<any> {
    return this.http.get(`${cityURL}select&state_id=${id}`);
  }
  getArea(id): Observable<any> {
    return this.http.get(`${areaURL}select&city_id=${id}`);
  }
  addAddress(myFormData): Observable<any> {
    return this.http.post(`${addressURL}insert`, myFormData)
  }

  async Confirm() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Confirm Alert',
      subHeader: 'Beware lets confirm',
      message: 'Are you sure? You Want To Cancel Booking?',
        buttons: [
          {
            text: 'Never',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Yes!',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async Alert(message) {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Alert',
      subHeader: 'Beware lets Alert',
      message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await alert.present();
    });
  }


  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3600,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }
  async ConfirmAuction() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Cancel Auction Alert',
      subHeader: 'Confirm to Continue..',
      message: 'Are you sure? You Want To Cancel Auction?',
        buttons: [
          {
            text: 'Never',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'Yes!',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }


}

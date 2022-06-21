import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-my-auction',
  templateUrl: './my-auction.page.html',
  styleUrls: ['./my-auction.page.scss'],
})
export class MyAuctionPage implements OnInit {


  Array: Array<{ Days: any }> = [];
  Array1: Array<{ Chat: any, Min: any, Max: any, OneBid: any, NoBid: any }> = [];
  Array2: Array<{ Chat: any, Min: any, Max: any, OneBid: any, NoBid: any }> = [];
  Days: any
  datalength: number
  show: any;
  constructor(private router: Router, public userService: UserApiService) { }
  userDetails: any
  role: any;
  userId: any;
  data: any;
  datalength1: number
  datalength2: number
  datalength3: number
  data1: any;
  data2: any
  data3: any
  min: any = '0'
  max: any = '0'
  onebid: any
  nobid: any
  chat: any
  chat1: any
  ngOnInit() {
    this.show = 'open';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.role = this.userDetails[0].user_role;
    if (this.userDetails == null || this.role != 3) {
      this.router.navigate(['auction-login']);
    }
    this.userId = this.userDetails[0].id;

    this.getCurrentAuction();
    // if(!navigator.geolocation){
    //   console.log('Location is not supported')
    // }
    // navigator.geolocation.getCurrentPosition((position)=>{
    //   console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`)
    // })
    // this.watchPosition();
  }
  // watchPosition(){
  //   let deslat=0;
  //   let deslon;
  //  let id= navigator.geolocation.watchPosition((position)=>{
  //     console.log(`lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`)
  //     if(position.coords.latitude===deslat){
  //       navigator.geolocation.clearWatch(id);
  //     }
  //   },(err)=>{
  //     console.log(err)
  //   },{
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   })
  // }


  create() {
    this.router.navigate(['/auction-home/create-auction']);
  }
  auction(val, auctionid, my_auction) {
    this.router.navigate(['auction-home/auction-detail', { show: val, auctionid: auctionid, auction: my_auction }]);
  }
  getCurrentAuction() {
    // console.log(userId)
    var formdata: any = new FormData();
    formdata.append('user_id', this.userId)
    this.userService.getCurrentAuctions(formdata).toPromise().then((res) => {

      this.data = res;
      this.datalength = this.data.length
      // console.log(this.data)
      for (let i = 0; i < this.datalength; i++) {
        var date1 = new Date();
        //   console.log(date1)
        var date2 = new Date(this.data[i].end_date);
        //  console.log(date2)
        let time = (date2.getTime() - date1.getTime())
        this.Days = Math.floor(time / (1000 * 3600 * 24))
        // var hours = Math.floor(time / (60 * 60 * 1000)) - (this.Days * 24);
        // console.log(this.Days, hours)


        //getting auction id to get how many placed bid
        var auctionid = this.data[i].auction_id

        this.userService.getAuctionChat(auctionid).subscribe((res) => {

          this.data1 = res;
          this.datalength1 = this.data1.length


          console.log(this.data1)

          if (this.datalength1 > 1) {
            this.min = this.data1[0].comment
            this.max = this.data1[0].comment

            //finding min max bid
            for (var j = 0; j < this.datalength1; j++) {

              if (this.min > this.data1[j].comment) {
                this.min = this.data1[j].comment
              }
              if (this.max < this.data1[j].comment) {
                this.max = this.data1[j].comment
              }
            }
            this.onebid = 'false'
            this.nobid = 'false'
            // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: 'false', NoBid: 'false' })
          }
          else if (this.datalength1 == 1) {
            this.onebid = this.data1[0].comment
            this.nobid = 'false'
            // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: this.data1[i].comment, NoBid: 'flase' })
          }
          else {
            this.onebid = 'false'
            this.nobid = 'true'
            // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: 'false', NoBid: 'true' })
          }
          //  console.log(this.datalength1, this.min, this.max,this.onebid, this.nobid)
          this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: this.onebid, NoBid: this.nobid })
          this.max = '0'
          this.min = '0'
          //  console.log(this.Array1)
        });

        this.Array.push({ Days: this.Days })
        //   console.log(this.Array)
      }
      this.chat = this.Array1;
      console.log(this.chat)
    })

  }
  confirmClose(auction_id){

    this.userService.ConfirmAuction().then((res)=>{
      console.log(res)
      if(res){

        var formdata1:any = new FormData()
        formdata1.append('auction_id',auction_id)
        this.userService.cancelAuction(formdata1).subscribe((res)=>{
         location.reload();
        })
      }else{
        console.log("false so no auctionid")
      }
    })
  }
  change(show) {
    this.show = show;
    if (show == 'close') {

      var formdata: any = new FormData();
      formdata.append('user_id', this.userId)
      this.userService.getCancelAuctions(formdata).subscribe((res) => {

        this.data2 = res;
        this.datalength2 = this.data2.length
        // console.log(this.data)
        for (let i = 0; i < this.datalength2; i++) {

          //getting auction id to get how many placed bid
          var auctionid = this.data2[i].auction_id

          this.userService.getAuctionChat(auctionid).subscribe((res3) => {

            this.data3 = res3;
            this.datalength3 = this.data3.length


            console.log(this.data3)

            if (this.datalength3 > 1) {
              this.min = this.data3[0].comment
              this.max = this.data3[0].comment
              //finding min max bid
              for (var j = 0; j < this.datalength1 - 1; j++) {

                if (this.min > this.data3[j + 1].comment) {
                  this.min = this.data3[j + 1].comment
                }
                if (this.max < this.data3[j + 1].comment) {
                  this.max = this.data3[j + 1].comment
                }
              }
              this.onebid = 'false'
              this.nobid = 'false'
              // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: 'false', NoBid: 'false' })
            }
            else if (this.datalength3 == 1) {
              this.onebid = this.data3[0].comment
              this.nobid = 'false'
              // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: this.data1[i].comment, NoBid: 'flase' })
            }
            else {
              this.onebid = 'false'
              this.nobid = 'true'
              // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: 'false', NoBid: 'true' })
            }
            //  console.log(this.datalength1, this.min, this.max,this.onebid, this.nobid)
            this.Array2.push({ Chat: this.datalength3, Min: this.min, Max: this.max, OneBid: this.onebid, NoBid: this.nobid })
            this.min = '0'
            this.max = '0'
            //  console.log(this.Array1)
          });
          this.chat1 = this.Array2;
          console.log(this.chat1)
        }


      })
    }
    else if (show == 'open') {
      this.getCurrentAuction();
    }
  }
}

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';
@Component({
  selector: 'app-all-auction',
  templateUrl: './all-auction.page.html',
  styleUrls: ['./all-auction.page.scss'],
})
export class AllAuctionPage implements OnInit {


  Array: Array<{ Days: any }> = [];
  Array1: Array<{ Chat: any, Min: any, Max: any, OneBid: any, NoBid: any }> = [];
  Check: Array<{Bid: any}>=[]
  chat:any
  Days: any
  datalength: number
  show: any;
  constructor(private router: Router, public userService: UserApiService) { }
  userDetails: any
  role: any;
  userId: any;
  data: any;
  datalength1: number
  data1: any;
  min: any='0'
  max: any='0'
  onebid:any
  nobid:any
  favo:boolean=false
  ngOnInit() {
    this.show = 'open';
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.role = this.userDetails[0].user_role;
    if (this.userDetails == null) {
      this.router.navigate(['auction-login']);
    }
    this.userId = this.userDetails[0].id;

    this.getAllAuction(this.userDetails[0].id);
  }
  auction(val, auctionid, all_auction) {
    this.router.navigate(['auction-home/auction-detail', { show: val, auctionid: auctionid, auction: all_auction }]);
  }

  getAllAuction(userId) {

    this.userService.getAuction().toPromise().then((res) => {

      this.data = res;
      console.log(this.data)
      this.datalength = this.data.length

      //    console.log(this.data)
      for (let i = 0; i < this.datalength; i++) {


        var date1 = new Date();
        //    console.log(date1)
        var date2 = new Date(this.data[i].schedule_date);
        //   console.log(date2)
        let time = (date2.getTime() - date1.getTime())
        this.Days = Math.floor(time / (1000 * 3600 * 24))
        var hours = Math.floor(time / (60 * 60 * 1000)) - (this.Days * 24);
        //    console.log(this.Days, hours)

        //getting auction id to get how many placed bid
        var auctionid = this.data[i].auction_id

        this.userService.getAuctionChat(auctionid).subscribe((res) => {

          this.data1 = res;
          this.datalength1 = this.data1.length

       //   console.log(this.datalength1)

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
            this.onebid ='false'
            this.nobid = 'false'
           // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: 'false', NoBid: 'false' })
          }
          else if (this.datalength1 == 1) {
            this.onebid=this.data1[0].comment
            this.nobid='false'
           // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: this.data1[i].comment, NoBid: 'flase' })
          }
          else {
            this.onebid='false'
            this.nobid='true'
           // this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: 'false', NoBid: 'true' })
          }
       //   console.log(this.datalength1, this.min, this.max,this.onebid, this.nobid)
          this.Array1.push({ Chat: this.datalength1, Min: this.min, Max: this.max, OneBid: this.onebid, NoBid: this.nobid })
          this.min = '0'
          this.max = '0'
        //  console.log(this.Array1)
        });

        this.Array.push({ Days: this.Days })

      }
      this.chat=this.Array1
      console.log(this.chat)

    })

  }
  fav(auctionid){
    this.favo=!this.favo

  }
}

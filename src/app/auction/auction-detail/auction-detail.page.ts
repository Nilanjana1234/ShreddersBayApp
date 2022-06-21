
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from 'src/app/services/user-api.service';

import { DatePipe, formatDate } from '@angular/common';
import { format } from 'path';
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.page.html',
  styleUrls: ['./auction-detail.page.scss'],
})
export class AuctionDetailPage implements OnInit,OnDestroy {
  show: any;
  show1: any;
  userId: any
  auctionid: any;
  data: any
  mes: string = '';
  data1:any
  datalength:any
  viewauction:any
  tp:any
  aname:string
  anamelength:any
  pname:any
  sdate:any
  tw:any
  addr_id:any
  addr_name
//countdown
currentDate: any;
targetDate: any;
cDateMillisecs: any;
tDateMillisecs: any;
difference: any;
seconds: any;
minutes: any;
hours: any;
days: any;
year: number = 2023;
month: number = 6;
day: number = 31;
sin:any

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserApiService, public datePipe : DatePipe) { }

  ngOnInit() {
    var userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.userId = userDetails[0].id
    this.show = this.route.snapshot.paramMap.get('show');
    this.auctionid = this.route.snapshot.paramMap.get('auctionid')
    console.log(this.show, this.auctionid)
    this.viewauction= this.route.snapshot.paramMap.get('auction')
    //this.show='bid';
    var newform: any = new FormData();
    newform.append('auction_id', this.auctionid)
    this.userService.getSingleAuction(newform).subscribe((res) => {
      this.data = res;
      console.log(this.data)
      this.tp=this.data[0].total_price;
      this.aname=this.data[0].name;
      this.anamelength=this.aname.length
      this.pname=this.data[0].p_name
      this.targetDate=this.data[0].schedule_date
      this.sdate=this.data[0].booking_date
      this.tw=this.data[0].total_wieght
      this.addr_id=this.data[0].addr_id
      this.userService.getAddressById(this.addr_id).toPromise().then((res) => {

        console.log(res)
        this.addr_name = res.address;

      }).catch((err) => {
        console.log('Error' + err);
      });

      this.myTimer(this.targetDate)
    })
    this.userService.getAuctionChat(this.auctionid).subscribe((res)=>{
      this.data1=res;
      this.datalength=this.data1.length;
      console.log(this.data1)
    })

  }

  change(show) {
    this.show = show;

  }
  bidValue(val) {
    // this.userService.getAuctionById(val).subscribe((res)=>{
    //    console.log(res)
    // })
    console.log(val,this.data[0].total_price)
    if (val <= this.data[0].total_price) {
      this.mes = "*Bid Price must be Greater than Auction Price"
    }
    else {
      this.mes=""
      var formdata: any = new FormData();
      formdata.append('add', val)
      formdata.append('user_id', this.userId)
      formdata.append('auction_id', this.auctionid)
      this.userService.auctionChat(formdata).subscribe((res) => {
        console.log(res);
        location.reload();
      })
    }
  }
  myTimer(targetDate) {

    this.currentDate = new Date();
    const targetDate1=  new Date(targetDate)

    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = targetDate1.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;

    if(this.difference>0){

    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;

    document.getElementById('days').innerText = this.days;
    document.getElementById('hours').innerText = this.hours;
    document.getElementById('mins').innerText = this.minutes;
    document.getElementById('seconds').innerText = this.seconds;

    this.sin=setInterval(this.myTimer, 1000,this.targetDate);

    }
    else{
      document.getElementById('days').innerText = "00";
      document.getElementById('hours').innerText = "00";
      document.getElementById('mins').innerText = "00";
      document.getElementById('seconds').innerText = "00";
    }
  }
  ngOnDestroy(){
    if(this.sin){
      clearInterval(this.sin)
      console.log("deleted")
    }

  }
}

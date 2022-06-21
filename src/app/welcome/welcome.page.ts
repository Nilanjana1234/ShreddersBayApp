import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor( private route: Router ) { 
    
    
  }
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  ngOnInit() {
   if(localStorage.getItem('userDetails')){
      this.route.navigate(['/frontend'])
    }
  }
 front(){
  this.route.navigate(['/frontend'])
 }

}

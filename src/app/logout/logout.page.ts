import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserApiService } from '../services/user-api.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private userService: UserApiService,
  ) { }

  ngOnInit() {
    localStorage.removeItem('userDetails');
    localStorage.clear();
    this.userService.openToast('Logout Successfully...');
    this.router.navigate(['/frontend']);
  }



}

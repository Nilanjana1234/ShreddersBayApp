import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuctionLoginPageRoutingModule } from './auction-login-routing.module';

import { AuctionLoginPage } from './auction-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuctionLoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuctionLoginPage]
})
export class AuctionLoginPageModule {}

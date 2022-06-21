import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAddrPageRoutingModule } from './my-addr-routing.module';

import { MyAddrPage } from './my-addr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAddrPageRoutingModule
  ],
  declarations: [MyAddrPage]
})
export class MyAddrPageModule {}

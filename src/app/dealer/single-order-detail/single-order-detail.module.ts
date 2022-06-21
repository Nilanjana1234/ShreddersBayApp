import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleOrderDetailPageRoutingModule } from './single-order-detail-routing.module';

import { SingleOrderDetailPage } from './single-order-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleOrderDetailPageRoutingModule
  ],
  declarations: [SingleOrderDetailPage]
})
export class SingleOrderDetailPageModule {}

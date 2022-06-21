import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealerBookingPageRoutingModule } from './dealer-booking-routing.module';

import { DealerBookingPage } from './dealer-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealerBookingPageRoutingModule
  ],
  declarations: [DealerBookingPage]
})
export class DealerBookingPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableBookingPageRoutingModule } from './available-booking-routing.module';

import { AvailableBookingPage } from './available-booking.page';


import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableBookingPageRoutingModule,
    Ng2SearchPipeModule,
    Ng2FilterPipeModule
  ],
  declarations: [AvailableBookingPage]
})
export class AvailableBookingPageModule {}

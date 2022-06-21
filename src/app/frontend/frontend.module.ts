import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FrontendPageRoutingModule } from './frontend-routing.module';

import { FrontendPage } from './frontend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FrontendPageRoutingModule
  ],
  declarations: [FrontendPage]
})
export class FrontendPageModule {}

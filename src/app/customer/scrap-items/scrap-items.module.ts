import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScrapItemsPageRoutingModule } from './scrap-items-routing.module';

import { ScrapItemsPage } from './scrap-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ScrapItemsPageRoutingModule
  ],
  declarations: [ScrapItemsPage]
})
export class ScrapItemsPageModule {}

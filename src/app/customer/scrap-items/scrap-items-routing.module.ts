import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScrapItemsPage } from './scrap-items.page';

const routes: Routes = [
  {
    path: '',
    component: ScrapItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrapItemsPageRoutingModule {}

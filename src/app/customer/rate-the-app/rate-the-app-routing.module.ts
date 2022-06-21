import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateTheAppPage } from './rate-the-app.page';

const routes: Routes = [
  {
    path: '',
    component: RateTheAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateTheAppPageRoutingModule {}

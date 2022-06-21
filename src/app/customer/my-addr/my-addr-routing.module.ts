import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAddrPage } from './my-addr.page';

const routes: Routes = [
  {
    path: '',
    component: MyAddrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAddrPageRoutingModule {}

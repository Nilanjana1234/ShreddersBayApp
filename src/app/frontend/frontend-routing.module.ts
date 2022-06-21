import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendPage } from './frontend.page';

const routes: Routes = [
  {
    path: '',
    component: FrontendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendPageRoutingModule {}

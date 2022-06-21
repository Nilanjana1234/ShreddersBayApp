import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerHomePage } from './customer-home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer-home/customer',
    pathMatch: 'full'
  },
  {
    path: 'customer-home',
    component: CustomerHomePage,
    children: [
      {
        path: 'customer',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/customer/customer.module').then(m => m.CustomerPageModule)
          }
        ]
      },
      {
        path: 'scrap-items',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/scrap-items/scrap-items.module').then(m => m.ScrapItemsPageModule)
          }
        ]
      },
      {
        path: 'my-booking',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/my-booking/my-booking.module').then(m => m.MyBookingPageModule)
          }
        ]
      },
      {
        path: 'my-cart',
        children: [
          {
            path: '',
            loadChildren: () => import('../../customer/my-cart/my-cart.module').then(m => m.MyCartPageModule)
          }
        ]
      },
      {
        path: 'my-account',
        children: [
          {
            path: '',
            loadChildren: () => import('../../my-account/my-account.module').then(m => m.MyAccountPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'customer-home/customer',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerHomePageRoutingModule { }

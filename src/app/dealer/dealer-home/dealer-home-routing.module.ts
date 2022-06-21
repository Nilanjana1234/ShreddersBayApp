import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerHomePage } from './dealer-home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dealer-home/dealer',
    pathMatch: 'full'
  },
  {
    path: 'dealer-home',
    component: DealerHomePage,
    children: [
      {
        path: 'dealer',
        children: [
          {
            path: '',
            loadChildren: () => import('../dealer/dealer.module').then(m => m.DealerPageModule)
          }
        ]
      },
      {
        path: 'dealer-booking',
        children: [
          {
            path: '',
            loadChildren: () => import('../dealer-booking/dealer-booking.module').then(m => m.DealerBookingPageModule)
          },
        ]
      },
      {
        path: 'my-account',
        children: [
          {
            path: '',
            loadChildren: () => import('../../my-account/my-account.module').then(m => m.MyAccountPageModule)
          },
        ]
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            loadChildren: () => import('../../notifications/notifications.module').then(m => m.NotificationsPageModule)
          },
        ]
      },
      {
        path: 'faqs',
        children: [
          {
            path: '',
            loadChildren: () => import('../../faqs/faqs.module').then(m => m.FaqsPageModule)
          },
        ]
      },
      {
        path: 'terms-conditions',
        children: [
          {
            path: '',
            loadChildren: () => import('../../terms-conditions/terms-conditions.module').then(m => m.TermsConditionsPageModule)
          },
        ]
      },
      {
        path: 'contact-us',
        children: [
          {
            path: '',
            loadChildren: () => import('../../contact-us/contact-us.module').then(m => m.ContactUsPageModule)
          },
        ]
      },
      {
        path: 'logout',
        children: [
          {
            path: '',
            loadChildren: () => import('../../logout/logout.module').then(m => m.LogoutPageModule)
          },
        ]
      },
      {
        path: 'available-booking',
        children: [
          {
            path: '',
            loadChildren: () => import('../available-booking/available-booking.module').then(m => m.AvailableBookingPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: 'dealer-home/dealer',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealerHomePageRoutingModule { }

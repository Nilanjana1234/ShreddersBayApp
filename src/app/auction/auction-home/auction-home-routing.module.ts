import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionHomePage } from './auction-home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auction-home/auction-dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuctionHomePage,
    children: [
      
        {
          path: 'auction-dashboard',
          children: [
            {
              path: '',
              loadChildren: () => import('../auction-dashboard/auction-dashboard.module').then(m => m.AuctionDashboardPageModule)
            }
          ]
        }, 
          {
          path: 'my-auction',
          children: [
            {
              path: '',
              loadChildren: () => import('../my-auction/my-auction.module').then(m => m.MyAuctionPageModule)
            }
          ]
        }, 
        {
          path: 'create-auction',
          children: [
            {
              path: '',
              loadChildren: () => import('../create-auction/create-auction.module').then(m => m.CreateAuctionPageModule)
            }
          ]
        }, 
        {
          path: 'auction-detail',
          children: [
            {
              path: '',
              loadChildren: () => import('../auction-detail/auction-detail.module').then(m => m.AuctionDetailPageModule)
            }
          ]
        }, 
        {
          path: 'auction-cart',
          children: [
            {
              path: '',
              loadChildren: () => import('../auction-cart/auction-cart.module').then(m => m.AuctionCartPageModule)
            }
          ]
        }, 
        {
          path: 'auction-addr',
          children: [
            {
              path: '',
              loadChildren: () => import('../auction-addr/auction-addr.module').then(m => m.AuctionAddrPageModule)
            }
          ]
        },
        {
          path: 'auction-add-addr',
          children: [
            {
              path: '',
              loadChildren: () => import('../auction-add-addr/auction-add-addr.module').then(m => m.AuctionAddAddrPageModule)
            }
          ]
        },
        {
          path: 'all-auction',
          children: [
            {
              path: '',
              loadChildren: () => import('../all-auction/all-auction.module').then(m => m.AllAuctionPageModule)
            }
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
            }
          ]
        },
        {
          path: '',
          redirectTo: 'auction-home/auction-dashboard',
          pathMatch: 'full'
        }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuctionHomePageRoutingModule {}

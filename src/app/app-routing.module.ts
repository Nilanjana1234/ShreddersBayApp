import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'frontend',
    loadChildren: () => import('./frontend/frontend.module').then( m => m.FrontendPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'my-cart',
    loadChildren: () => import('./customer/my-cart/my-cart.module').then( m => m.MyCartPageModule)
  },
  {
    path: 'my-booking',
    loadChildren: () => import('./customer/my-booking/my-booking.module').then( m => m.MyBookingPageModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./my-account/my-account.module').then( m => m.MyAccountPageModule)
  },
  {
    path: 'scrap-items',
    loadChildren: () => import('./customer/scrap-items/scrap-items.module').then( m => m.ScrapItemsPageModule)
  },
  {
    path: 'booking-details',
    loadChildren: () => import('./customer/booking-details/booking-details.module').then( m => m.BookingDetailsPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'my-addr',
    loadChildren: () => import('./customer/my-addr/my-addr.module').then( m => m.MyAddrPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./customer/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'customer-home',
    loadChildren: () => import('./customer/customer-home/customer-home.module').then( m => m.CustomerHomePageModule)
  },
  {
    path: 'dealer-home',
    loadChildren: () => import('./dealer/dealer-home/dealer-home.module').then( m => m.DealerHomePageModule)
  },
  {
    path: 'dealer',
    loadChildren: () => import('./dealer/dealer/dealer.module').then( m => m.DealerPageModule)
  },
  {
    path: 'dealer-booking',
    loadChildren: () => import('./dealer/dealer-booking/dealer-booking.module').then( m => m.DealerBookingPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./dealer/order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'rate-the-app',
    loadChildren: () => import('./customer/rate-the-app/rate-the-app.module').then( m => m.RateTheAppPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'terms-conditions',
    loadChildren: () => import('./terms-conditions/terms-conditions.module').then( m => m.TermsConditionsPageModule)
  },
  {
    path: 'available-booking',
    loadChildren: () => import('./dealer/available-booking/available-booking.module').then( m => m.AvailableBookingPageModule)
  },
  {
    path: 'add-address',
    loadChildren: () => import('./add-address/add-address.module').then( m => m.AddAddressPageModule)
  },
{
  path: 'forget-password',
  loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
},
  {
    path: 'single-order-detail',
    loadChildren: () => import('./dealer/single-order-detail/single-order-detail.module').then( m => m.SingleOrderDetailPageModule)
  },
  {
    path: 'auction',
    loadChildren: () => import('./customer/auction/auction.module').then( m => m.AuctionPageModule)
  },
  {
    path: 'current-auction',
    loadChildren: () => import('./customer/current-auction/current-auction.module').then( m => m.CurrentAuctionPageModule)
  },
  {
    path: 'auction-details',
    loadChildren: () => import('./customer/auction-details/auction-details.module').then( m => m.AuctionDetailsPageModule)
  },
  {
    path: 'available-auction',
    loadChildren: () => import('./available-auction/available-auction.module').then( m => m.AvailableAuctionPageModule)
  },
  {
    path: 'single-auction-detail',
    loadChildren: () => import('./single-auction-detail/single-auction-detail.module').then( m => m.SingleAuctionDetailPageModule)
  },
  {
    path: 'mobile',
    loadChildren: () => import('./mobile/mobile.module').then( m => m.MobilePageModule)
  },
  {
    path: 'verifyotp',
    loadChildren: () => import('./verifyotp/verifyotp.module').then( m => m.VerifyotpPageModule)
  },
  {
    path: 'auction-login',
    loadChildren: () => import('./auction-login/auction-login.module').then( m => m.AuctionLoginPageModule)
  },
  {
    path: 'auction-dashboard',
    loadChildren: () => import('./auction/auction-dashboard/auction-dashboard.module').then( m => m.AuctionDashboardPageModule)
  },
  {
    path: 'auction-home',
    loadChildren: () => import('./auction/auction-home/auction-home.module').then( m => m.AuctionHomePageModule)
  },
  {
    path: 'my-auction',
    loadChildren: () => import('./auction/my-auction/my-auction.module').then( m => m.MyAuctionPageModule)
  },
  {
    path: 'create-auction',
    loadChildren: () => import('./auction/create-auction/create-auction.module').then( m => m.CreateAuctionPageModule)
  },
  {
    path: 'auction-detail',
    loadChildren: () => import('./auction/auction-detail/auction-detail.module').then( m => m.AuctionDetailPageModule)
  },
  {
    path: 'auction-cart',
    loadChildren: () => import('./auction/auction-cart/auction-cart.module').then( m => m.AuctionCartPageModule)
  },
  {
    path: 'auction-addr',
    loadChildren: () => import('./auction/auction-addr/auction-addr.module').then( m => m.AuctionAddrPageModule)
  },
  {
    path: 'auction-add-addr',
    loadChildren: () => import('./auction/auction-add-addr/auction-add-addr.module').then( m => m.AuctionAddAddrPageModule)
  },
  {
    path: 'all-auction',
    loadChildren: () => import('./auction/all-auction/all-auction.module').then( m => m.AllAuctionPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./customer/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./dealer/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'all-auction',
    loadChildren: () => import('./customer/all-auction/all-auction.module').then( m => m.AllAuctionPageModule)
  },
  {
    path: 'all-auction',
    loadChildren: () => import('./dealer/all-auction/all-auction.module').then( m => m.AllAuctionPageModule)
  }








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


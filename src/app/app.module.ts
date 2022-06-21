import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

// Import camera module
import { Camera } from '@ionic-native/camera/ngx';

import {  File } from '@ionic-native/file/ngx/index';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: true,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
  ],

  providers: [
    DatePipe,
    Camera,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},
    Facebook,
    GooglePlus
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

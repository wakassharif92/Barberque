import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentListPageRoutingModule } from './appointment-list-routing.module';

import { AppointmentListPage } from './appointment-list.page';
import { TimeAgoPipe } from 'time-ago-pipe';
import { HammerModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentListPageRoutingModule,
    HammerModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule
  ],
  declarations: [AppointmentListPage,TimeAgoPipe],
  providers: [
    
  ]
})
export class AppointmentListPageModule {}

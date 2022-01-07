import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule,
    TranslateModule,
    NgxProgressiveImgLoaderModule
  ],
  declarations: [NotificationPage,TimeAgoPipe]
})
export class NotificationPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NearbyPageRoutingModule } from './nearby-routing.module';

import { NearbyPage } from './nearby.page';
import { AgmCoreModule } from '@agm/core';            // @agm/core
import { AgmDirectionModule } from 'agm-direction'; 
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NearbyPageRoutingModule,
    AgmCoreModule.forRoot({ // @agm/core
      apiKey: 'AIzaSyBo7u69HyRA49RV-VPeTmaJiA3UwbZTwe0',
    }),
    AgmDirectionModule, 
    AgmSnazzyInfoWindowModule,
    TranslateModule,
  ],
  declarations: [NearbyPage]
})
export class NearbyPageModule {}

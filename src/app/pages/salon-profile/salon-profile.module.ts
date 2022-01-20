import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SalonProfilePageRoutingModule } from "./salon-profile-routing.module";

import { SalonProfilePage } from "./salon-profile.page";
import { TimeAgoPipe } from "time-ago-pipe";
import { TranslateModule } from "@ngx-translate/core";
import { NgxProgressiveImgLoaderModule } from "ngx-progressive-img-loader";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		SalonProfilePageRoutingModule,
		TranslateModule,
		NgxProgressiveImgLoaderModule,
	],
	declarations: [SalonProfilePage, TimeAgoPipe],
})
export class SalonProfilePageModule {}

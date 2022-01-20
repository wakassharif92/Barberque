import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CheckoutPageRoutingModule } from "./checkout-routing.module";

import { CheckoutPage } from "./checkout.page";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "src/app/components/header/header.component";

@NgModule({
	imports: [
		CommonModule,

		FormsModule,
		TranslateModule,
		IonicModule,
		ReactiveFormsModule,
		CheckoutPageRoutingModule,
	],
	declarations: [CheckoutPage],
})
export class CheckoutPageModule {}

import { Component, OnInit } from "@angular/core";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { NavController, Platform, MenuController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-notification",
	templateUrl: "./notification.page.html",
	styleUrls: ["./notification.page.scss"],
})
export class NotificationPage implements OnInit {
	data: any = [];
	cartCounter: any;
	language: any;
	constructor(
		private util: UtilserviceService,
		private navCtrl: NavController,
		private api: ApiService,
		private platform: Platform,
		private menuController: MenuController
	) {
		this.backButtonEvent();
	}

	search() {
		this.util.startLoad();
		this.navCtrl.navigateForward("tabs/home/search");
	}

	openCart() {
		this.navCtrl.navigateForward("/cart");
	}
	ngOnInit() {
		this.cartCounter = JSON.parse(localStorage.getItem("addProducts"));
		if (this.cartCounter) {
			this.cartCounter = this.cartCounter.length;
		} else {
			this.cartCounter = 0;
		}
	}

	ionViewWillEnter() {
		this.language = localStorage.getItem("lan");
		this.menuController.swipeGesture(false);
		this.util.startLoad();
		this.api.getDataWithToken("notification").subscribe(
			(success: any) => {
				if (success.success) {
					this.data = success.data;
					this.util.dismissLoader();
				}
			},
			(err) => {
				this.util.dismissLoader();
			}
		);
	}

	backButtonEvent() {
		this.platform.backButton.subscribe(() => {
			this.navCtrl.navigateBack("tabs/home");
		});
	}
}

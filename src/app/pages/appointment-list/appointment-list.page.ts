import { Component, OnInit, ViewChild } from "@angular/core";
import {
	ModalController,
	NavController,
	IonSlides,
	Platform,
	MenuController,
} from "@ionic/angular";
import { CancelBookingPage } from "src/app/modals/cancel-booking/cancel-booking.page";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { AddReviewPage } from "src/app/modals/add-review/add-review.page";

@Component({
	selector: "app-appointment-list",
	templateUrl: "./appointment-list.page.html",
	styleUrls: ["./appointment-list.page.scss"],
})
export class AppointmentListPage implements OnInit {
	upComingAppointment: any = [];
	booking_Id: any;
	cartCounter: any;
	past_order: any = [];
	date: Date;
	upServices: any = [];
	paServices: any = [];
	services: any = [];
	salon_id: any;
	isExpand: any = false;
	completed: any = [];
	canceled: any = [];
	language: any;
	@ViewChild("slides", { static: true }) slider: IonSlides;
	constructor(
		private modal: ModalController,
		private navCtrl: NavController,
		private util: UtilserviceService,
		private api: ApiService,
		private platform: Platform,
		private menuController: MenuController
	) {
		this.backButtonEvent();
	}
	async segmentChanged() {
		await this.slider.slideTo(this.select);
	}

	async slideChanged() {
		this.select = await this.slider.getActiveIndex();
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
		this.util.startLoad();
		this.language = localStorage.getItem("lan");
		// console.log(this.language);
		this.api.getDataWithToken("appointment").subscribe(
			(success: any) => {
				if (success.success == true) {
					this.upComingAppointment = success.data.upcoming_order;
					this.completed = success.data.completed;
					this.canceled = success.data.cancel;
					this.util.dismissLoader();
				} else {
					this.util.dismissLoader();
				}
			},
			(err) => {
				this.util.dismissLoader();
			}
		);
		this.menuController.swipeGesture(false);
	}

	singleView(id) {
		localStorage.setItem("singaleId", JSON.stringify(id));
		this.navCtrl.navigateForward("tabs/appointment/single-appointment");
	}

	cancelede(isFirstLoad, event) {
		this.api.getDataWithToken("appointment").subscribe((success: any) => {
			for (let i = 0; i < success.data.cancel.length; i++) {
				this.canceled.push(success.data.cancel[i]);
			}
			if (isFirstLoad) {
				event.target.complete();
			}
		});
	}
	search() {
		this.navCtrl.navigateBack("tabs/home/search");
	}

	loadData(event) {
		this.cancelede(true, event);
	}

	doRefresh(event) {
		setTimeout(() => {
			this.ionViewWillEnter();
			event.target.complete();
		}, 2000);
	}
	async presentModal(id) {
		const modal = await this.modal.create({
			component: CancelBookingPage,
			cssClass: "cancel-booking",
			componentProps: {
				booking_id: id.id,
			},
		});
		modal.onDidDismiss().then((res) => {
			this.upComingAppointment.forEach((element, index) => {
				if (element.id == res.data) {
					this.upComingAppointment.splice(index, 1);
					this.ionViewWillEnter();
				}
			});
		});
		this.util.dismissLoader();
		return await modal.present();
	}
	select = 0;
	async reviewModal(id) {
		const modal = await this.modal.create({
			component: AddReviewPage,
			cssClass: "add-review",
			componentProps: {
				booking_id: id.id,
				salon_id: id.salon.salon_id,
			},
		});
		modal.onDidDismiss().then((res) => {
			this.ionViewWillEnter();
		});
		return await modal.present();
	}

	expandToogle(val: any) {
		if (val.isExpand == true) {
			val.isExpand = false;
		} else {
			val.isExpand = true;
		}
	}

	backButtonEvent() {
		this.platform.backButton.subscribe(() => {
			this.navCtrl.navigateBack("tabs/home");
		});
	}
}

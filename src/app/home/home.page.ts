import { Component } from "@angular/core";
import { NavController, Platform, MenuController } from "@ionic/angular";
import { UtilserviceService } from "../services/utilservice.service";
import { ApiService } from "../services/api.service";
import { Router, NavigationExtras } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Network } from "@ionic-native/network/ngx";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	slideOpts = {
		spaceBetween: 20,
		autoplay: true,
	};
	latitude: number;
	longitude: number;
	cartCounter: any;
	address: string;
	accuracy: number;
	data: any;
	id: any;
	salon: any = {};
	currentdata: string;
	res: string;
	banners: any = [];
	categories: any = [];
	cat_id: any;
	nearBySalon: any = [];
	card: any;
	lat: any;
	long: any;
	distance: any;
	item: any;
	selectAddress: any = "";
	netType: any;
	language: any;
	constructor(
		private navCtrl: NavController,
		private util: UtilserviceService,
		private api: ApiService,
		private router: Router,
		private geolocaion: Geolocation,
		private platform: Platform,
		private network: Network,
		private menuController: MenuController
	) {
		const date = Date.now();
		const options: any = { weekday: "long" };
		this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
		this.res = this.currentdata.toLowerCase();
		var current_date = new Date();
		var weekday_value = current_date.getDay();
		this.netType = this.network.type;
		this.language = localStorage.getItem("lan");
		// console.log("cons","hiii");
	}
	doRefresh(event) {
		setTimeout(() => {
			this.ionViewWillEnter();
			this.ngOnInit();
			this.getLocation();
			event.target.complete();
		}, 2000);
	}

	ionViewWillEnter() {
		// console.log("view","hiii");
		this.util.startLoad();
		this.language = localStorage.getItem("lan");
		this.selectAddress = localStorage.getItem("dataofaddress");
		this.menuController.swipeGesture(false);
		this.getLocation();
		this.api.getData("banners").subscribe((success: any) => {
			if (success.success == true) {
				this.banners = success.data;
				this.util.dismissLoader();
			} else {
				this.util.dismissLoader();
			}
		});
	}

	ngOnInit() {
		this.cartCounter = JSON.parse(localStorage.getItem("addProducts"));
		if (this.cartCounter) {
			this.cartCounter = this.cartCounter.length;
		} else {
			this.cartCounter = 0;
		}

		// console.log("onit","hiii");
		this.util.startLoad();
		this.language = localStorage.getItem("lan");
		this.api.getData("banners").subscribe((success: any) => {
			if (success.success == true) {
				this.banners = success.data;
				this.util.dismissLoader();
			} else {
				this.util.dismissLoader();
			}
		});
		this.api.getData("categories").subscribe((success: any) => {
			if (success.success == true) {
				this.categories = success.data;
				this.categories.forEach((element) => {
					this.cat_id = element.cat_id;
				});
				this.util.dismissLoader();
			} else {
				this.util.dismissLoader();
			}
		});
		this.api.addressData;
		this.selectAddress = localStorage.getItem("dataofaddress");
		localStorage.removeItem("booking-detail");

		this.api.getData("salons").subscribe(
			(success: any) => {
				if (success.success == true) {
					this.data = success.data;
					this.data.forEach((element) => {
						this.lat = element.latitude;
						this.long = element.longitude;
						element.distance = this.api
							.getDistanceFromLatLonInKm(
								this.latitude,
								this.longitude,
								this.latitude,
								this.long
							)
							.toFixed(1);
					});
					this.id = success.data.salon_id;

					this.util.dismissLoader();
				} else {
					this.util.dismissLoader();
				}
			},
			(err) => {
				this.util.dismissLoader();
			}
		);
	}

	getGeolocation() {
		this.geolocaion
			.getCurrentPosition()
			.then((resp) => {
				this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;
				this.accuracy = resp.coords.accuracy;
			})
			.catch((error) => {
				alert("Error getting location" + JSON.stringify(error));
			});
	}

	addressLat: any;
	addressLng: any;
	async getLocation() {
		const position = await this.geolocaion.getCurrentPosition();
		this.addressLat = localStorage.getItem("addressLat");
		this.addressLng = localStorage.getItem("addressLng");
		this.latitude = this.addressLat
			? this.addressLat
			: position.coords.latitude;
		this.longitude = this.addressLng
			? this.addressLng
			: position.coords.longitude;
		let long = {
			lat: this.latitude,
			long: this.longitude,
		};
		this.api.postData("nearbysalon", long).subscribe(
			(success: any) => {
				if (success.success == true) {
					this.nearBySalon = success.data;
					this.nearBySalon.forEach((element) => {
						this.lat = element.latitude;
						this.long = element.longitude;
						element.distance = this.api
							.getDistanceFromLatLonInKm(
								this.latitude,
								this.longitude,
								this.lat,
								this.long
							)
							.toFixed(1);
					});
				} else {
					this.util.dismissLoader();
				}
			},
			(err) => {
				this.util.dismissLoader();
			}
		);
	}

	catSalon(cat_id) {
		let navigationExtras: NavigationExtras = {
			state: {
				cat_id: cat_id,
				address: this.address,
			},
		};
		this.router.navigate(["top-services"], navigationExtras);
		localStorage.setItem("catId", cat_id);
	}

	search() {
		let navigationExtra: NavigationExtras = {
			state: {
				address: this.address,
			},
		};
		this.router.navigate(["tabs/home/search"], navigationExtra);
	}

	allSalons() {
		let navigationExtra: NavigationExtras = {
			state: {
				address: this.address,
			},
		};
		this.router.navigate(["all-salons"], navigationExtra);
	}
	openCart() {
		this.navCtrl.navigateForward("/cart");
	}
	book(id) {
		let navigationExtras: NavigationExtras = {
			state: {
				id: id,
			},
		};
		this.router.navigate(["tabs/home/salon-profile"], navigationExtras);
		localStorage.setItem("Salon-id", id);
	}

	topServvices() {
		this.navCtrl.navigateForward("tabs/home/tops");
	}

	setLocation() {
		this.navCtrl.navigateForward("tabs/nearby/setlocatio");
	}

	appoint() {
		this.navCtrl.navigateBack("tabs/appointment");
	}
}

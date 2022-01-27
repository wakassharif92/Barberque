import { Component, OnInit } from "@angular/core";
import {
	AlertController,
	ModalController,
	NavController,
	Platform,
} from "@ionic/angular";
import { NavigationEnd, Router } from "@angular/router";
import { AddReviewPage } from "src/app/modals/add-review/add-review.page";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { NavigationExtras } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { PhotoViewer } from "@ionic-native/photo-viewer/ngx";
import {
	InAppBrowser,
} from "@ionic-native/in-app-browser/ngx";
import { Subscription } from "rxjs";
@Component({
	selector: "app-salon-profile",
	templateUrl: "./salon-profile.page.html",
	styleUrls: ["./salon-profile.page.scss"],
})
export class SalonProfilePage implements OnInit {
	id: any;
	pageName: string = `Barberque Nation`;
	data: any = {};
	imageP: any;
	number: any;
	gallary: any;
	review: any = [];
	category: any = [];
	rioTypes = ["ABC", "XYZ", "PQR", "XYZ"];
	items1: any = [1, 2, 3, 4];
	segmentVal: string = "Makeup";
	services: any;
	isChecked: boolean;
	checked: any;
	bookingCart = [];
	local: any = [];
	isItemChecked = false;
	total = 0;
	price = 0;
	salonId: any;
	latitude: number;
	longitude: number;
	buttonColor: string;
	distance: any;
	lng: number;
	lat: number;
	s: any;
	isIndeterminate: boolean;
	masterCheck: boolean;
	selectBtn: "Makeup";
	select = "ABOUT";
	selectt = "Makeup";
	currency: any;
	number__salon: any;
	currentdata: string;
	res: string;
	selectedDes: any;
	timeClose: string;
	endTime: any;
	language: any;
	openTime: any;
	photo: any;
	productsList: any;
	cartCounter: any;
	private subscription: Subscription;
	constructor(
		private router: Router,
		private modal: ModalController,
		private navCtrl: NavController,
		private util: UtilserviceService,
		private callNumber: CallNumber,
		private api: ApiService,
		private geolocation: Geolocation,
		private photoViewer: PhotoViewer,
		private theInAppBrowser: InAppBrowser,
		private platform: Platform,
		private alertController: AlertController
	) {
		this.id = localStorage.getItem("Salon-id");
		this.currency = localStorage.getItem("currency");
		const date = Date.now();
		const options: any = { weekday: "long" };
		this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
		this.res = this.currentdata.toLowerCase();
		var current_date = new Date();
		var weekday_value = current_date.getDay();
		this.backbutton();
		this.language = localStorage.getItem("lan");
		// console.log(this.language);

		if (this.language == "en") {
			this.selectedDes = "SERVICES";
			// console.log("this.selec", this.selectedDes);
		}
		if (this.language == "ar") {
			this.selectedDes = "إحجز";
			// console.log("this.selec else", this.selectedDes);
		}
		if (this.language == "ro") {
			this.selectedDes = "SERVICES";
			// console.log("this.selec", this.selectedDes);
		}
		
		this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd && event.url === '/tabs/home/salon-profile') {
                this.onEnter();
            }
        });
	}

	onEnter(): void {
        this.cartCounter = JSON.parse(localStorage.getItem("addProducts"));
		console.log('cart counter', this.cartCounter);
		if (this.cartCounter) {
			this.cartCounter = this.cartCounter.length;
		} else {
			this.cartCounter = 0;
		}
    }


	card: any;
	openWithSystemBrowser(url: string) {
		let target = "_system";
		this.theInAppBrowser.create(url, target);
	}

	backbutton() {
		this.platform.backButton.subscribe(() => {
			this.navCtrl.navigateBack("tabs/home");
		});
	}
	openCart() {
		this.navCtrl.navigateForward("/cart");
	}

	verifyEvent(id) {
		let selected = 0;
		this.local = JSON.parse(localStorage.getItem("booking-detail"))
			? JSON.parse(localStorage.getItem("booking-detail"))
			: [];

		this.services.map((item, index) => {
			if (item.service_id == id) {
				item.isItemChecked = !item.isItemChecked;
			}
			if (item.isItemChecked == true) {
				selected++;
				if (item.service_id == id) {
					this.price = item.price;
					this.total += this.price;
					if (this.data.home_charges) {
						// this.api.total = this.total + JSON.parse(this.data.home_charges);
						this.api.total = this.total;
						// this.api.extraCharges = this.data.home_charges;
						this.local.push(item);
						localStorage.setItem("total", this.api.total);
					} else {
						this.api.total = this.total;
						this.local.push(item);
						localStorage.setItem("total", this.api.total);
					}
				}
			}
		});
		this.services.map((item, index) => {
			if (item.isItemChecked == false) {
				selected--;
				if (item.service_id == id) {
					this.price = item.price;
					this.total -= this.price;
					this.api.total = this.total;
					this.local.pop(item);
				}
			}
		});

		localStorage.setItem("booking-detail", JSON.stringify(this.local));
		localStorage.setItem("total", this.api.total);
	}

	buttonDiv: any = [
		{
			name: "SERVICES",
		},
		{
			name: "PRODUCTS",
		},
		{
			name: "GALLERY",
		},
		{
			name: "ABOUT",
		},
		{
			name: "REVIEW",
		},
	];

	navigateToProductDetail(item) {
		localStorage.setItem("productDetail", JSON.stringify(item));
		this.navCtrl.navigateForward("/product-detail");
	}
	getSalonProducts() {
		this.api
			.getData("salon-product/" + this.id)
			.subscribe((mdata: any) => {
				this.productsList = mdata.data;
				//	console.log(this.productsList);
			});
	}

	ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

	ngOnInit() {
		this.util.startLoad();
		this.api.getData("salon/" + this.id).subscribe(
			(success: any) => {
				if (success.success) {
					// console.log(success.data.salon);

					this.data = success.data.salon;
					this.photo = this.data.imagePath + this.data.image;
					this.imageP = this.data.imagePath + this.data.image;
					if (this.res == "tuesday") {
						this.openTime = this.data.tuesday.open;
						this.endTime = this.data.tuesday.close;
					}
					if (this.res == "wednesday") {
						this.openTime = this.data.wednesday.open;
						this.endTime = this.data.wednesday.close;
					}
					if (this.res == "thursday") {
						this.openTime = this.data.thursday.open;
						this.endTime = this.data.thursday.close;
					}
					if (this.res == "friday") {
						this.openTime = this.data.friday.open;
						this.endTime = this.data.friday.close;
					}
					if (this.res == "saturday") {
						this.openTime = this.data.saturday.open;
						this.endTime = this.data.saturday.close;
					}
					if (this.res == "sunday") {
						this.openTime = this.data.sunday.open;
						this.endTime = this.data.sunday.close;
					}
					if (this.res == "monday") {
						this.openTime = this.data.monday.open;
						this.endTime = this.data.monday.close;
					}

					this.number__salon = success.data.salon.phone;
					this.lat = success.data.salon.latitude;
					this.lng = success.data.salon.longitude;
					setTimeout(() => {
						this.gallary = success.data.gallery;
					}, 5000);
					this.review = success.data.review;
					this.category = success.data.category;
					setTimeout(() => {
						this.category.forEach((element, index) => {
							this.s = this.category[0].name;
							this.services = this.category[0].service;
							element.isItemChecked = this.category[0].service;
						});
					}, 500);
					this.geolocation
						.getCurrentPosition()
						.then((resp) => {
							this.latitude = resp.coords.latitude;
							this.longitude = resp.coords.longitude;
							this.distance = this.api.getDistanceFromLatLonInKm(
								this.latitude,
								this.longitude,
								this.lat,
								this.lng
							);
							this.api.distance = this.distance;
							localStorage.setItem("distance", this.distance);
						})
						.catch((error) => {
							alert("Error getting location" + JSON.stringify(error));
						});
					this.api.salonDetail = this.data;
					this.util.dismissLoader();
				}
			},
			(error) => {
				this.util.dismissLoader();
			}
		);

		var dt = new Date();

		var timeString = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();

		this.timeClose = timeString + ":" + dt.getMinutes();

		this.getSalonProducts();
	}

	ionViewWillEnter() {
		localStorage.removeItem("booking-detail");
	}

	segmentChanged(event) {
		this.select = event.detail.value;
	}

	payment() {
		this.api.booking_at = this.serviceAt
			? this.serviceAt
			: this.data.give_service;
		if (this.serviceAt == "Home" || this.data.give_service == "Home") {
			this.api.total = this.total + JSON.parse(this.data.home_charges);
			localStorage.setItem(
				"extracharge",
				JSON.stringify(this.data.home_charges)
			);
			localStorage.setItem("total", this.api.total);
		} else {
			this.api.total = this.total;
			localStorage.setItem("total", this.api.total);
		}
		localStorage.setItem("serviceAt", JSON.stringify(this.serviceAt));
		let navigationExtras: NavigationExtras = {
			state: {
				total: this.api.total,
				salonId: this.id,
			},
		};
		this.navCtrl.navigateRoot(["tabs/home/select-time-slot"], navigationExtras);
	}

	btnDivChaangedd(b) {
		this.selectedDes = b.name;
	}

	photoShow(event) {
		this.photoViewer.show(event.imagePath + event.image);
	}

	btnChanged(c) {
		this.s = c;
		this.buttonColor = "#345465";
		this.category.forEach((element) => {
			if (element.name == c) {
				this.services = element.service;
			}
		});
	}

	serviceAt: any = "";
	async presentAlertConfirm() {
		const alert = await this.alertController.create({
			cssClass: "my-custom-class",
			header: "Service At !",
			message: "Choose the Place!!!",
			mode: "ios",
			backdropDismiss: false,
			buttons: [
				{
					text: "Home",
					handler: (blah) => {
						console.log("home");
						this.serviceAt = "Home";
						this.api.booking_at = this.serviceAt;
					},
				},
				{
					text: "Salon",
					handler: () => {
						this.serviceAt = "Salon";
						this.api.booking_at = this.serviceAt;
					},
				},
			],
		});
		await alert.present();
	}

	call() {
		this.callNumber
			.callNumber(this.number__salon, false)
			.then((res) => console.log("Launched dialer!", res))
			.catch((err) => console.log("Error launching dialer", err));
	}

	webshow() {
		this.navCtrl.navigateRoot("tabs/home/web");
	}

	setTheDirection() {
		let navigationExtras: NavigationExtras = {
			state: {
				longitude: this.longitude,
				latitude: this.latitude,
				salon_id: this.id,
			},
		};
		this.navCtrl.navigateRoot(["confirmlocation"], navigationExtras);
	}

	async presentModal() {
		const modal = await this.modal.create({
			component: AddReviewPage,
			cssClass: "add-review",
			componentProps: {
				salon_id: this.salonId,
			},
		});
		return await modal.present();
	}
}

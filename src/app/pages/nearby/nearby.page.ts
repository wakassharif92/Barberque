import { Component, OnInit } from "@angular/core";
import { NavController, Platform, MenuController } from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { Router, NavigationExtras } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Component({
	selector: "app-nearby",
	templateUrl: "./nearby.page.html",
	styleUrls: ["./nearby.page.scss"],
})
export class NearbyPage implements OnInit {
	data: any;
	currentdata: string;

	cartCounter: any;
	res: string;
	origin: any = {};
	destination: any = {};
	public renderOptions = {
		suppressMarkers: true,
		draggable: false,
	};
	lat: number;
	lng: number;

	public markerOptions = {
		origin: {
			icon: "../../../assets/icon/location1.svg",
		},
		destination: {
			icon: "../../../assets/icon/locaiton2.svg",
		},
		draggable: true,
	};
	openCart() {
		this.navCtrl.navigateForward("/cart");
	}
	labelOptions = {
		color: "white",
		fontFamily: "mon-medium",
		fontSize: "14px",
		fontWeight: "bold",
		text: "some text",
	};

	public iconUrl = "../../../assets/icon/Path 5.svg";
	latitude: number;
	longitude: number;
	accuracy: number;
	distance: number;
	language: any;

	constructor(
		private navCtrl: NavController,
		private util: UtilserviceService,
		private api: ApiService,
		private router: Router,
		private geolocation: Geolocation,
		private platform: Platform,
		private menuController: MenuController
	) {
		const date = Date.now();
		const options: any = { weekday: "long" };
		this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
		this.res = this.currentdata.toLowerCase();
		this.language = localStorage.getItem("lan");
		this.ionViewWillEnter();
		this.backButtonEvent();
	}

	backButtonEvent() {
		this.platform.backButton.subscribe(() => {
			this.navCtrl.navigateBack("tabs/home");
		});
	}

	ionViewWillEnter() {
		this.menuController.swipeGesture(false);
		this.language = localStorage.getItem("lan");
		this.getLocation();
	}

	async getLocation() {
		this.util.startLoad();
		setTimeout(async () => {
			const position = await this.geolocation.getCurrentPosition();
			this.latitude = position.coords.latitude;
			this.longitude = position.coords.longitude;
			console.log("latitude", this.latitude);
			console.log("longitude", this.longitude);
			let data = {
				lat: this.latitude,
				long: this.longitude,
			};
			this.api.postData("nearbysalon", data).subscribe(
				(success: any) => {
					if (success.success == true) {
						this.data = success.data;
						this.data.forEach((element) => {
							this.lat = element.latitude;
							this.lng = element.longitude;
							element.distance = this.api
								.getDistanceFromLatLonInKm(
									this.latitude,
									this.longitude,
									this.lat,
									this.lng
								)
								.toFixed(1);
						});
						this.util.dismissLoader();
					} else {
						this.util.dismissLoader();
					}
				},
				(err) => {
					this.util.dismissLoader();
				}
			);
			this.util.dismissLoader();
		}, 1000);
	}

	ngOnInit() {
		this.cartCounter = JSON.parse(localStorage.getItem("addProducts"));
		if (this.cartCounter) {
			this.cartCounter = this.cartCounter.length;
		} else {
			this.cartCounter = 0;
		}
		this.menuController.swipeGesture(false);
		this.language = localStorage.getItem("lan");
		this.getLocation();
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

	public styles = [
		{
			elementType: "geometry",
			stylers: [
				{
					color: "#f5f5f5",
				},
			],
		},
		{
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161",
				},
			],
		},
		{
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#f5f5f5",
				},
			],
		},
		{
			featureType: "administrative.land_parcel",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#bdbdbd",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [
				{
					color: "#e5e5e5",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
		{
			featureType: "road",
			elementType: "geometry",
			stylers: [
				{
					color: "#ffffff",
				},
			],
		},
		{
			featureType: "road.arterial",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
				{
					color: "#dadada",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161",
				},
			],
		},
		{
			featureType: "road.local",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
		{
			featureType: "transit.line",
			elementType: "geometry",
			stylers: [
				{
					color: "#e5e5e5",
				},
			],
		},
		{
			featureType: "transit.station",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee",
				},
			],
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{
					color: "#c9c9c9",
				},
			],
		},
		{
			featureType: "water",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
	];
}

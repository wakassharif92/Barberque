import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BehaviorSubject } from "rxjs";
import { AlertController } from "@ionic/angular";
@Injectable({
	providedIn: "root",
})
export class ApiService {
	public BASE_URL = "http://66.45.36.13/TheBarberAdmin/public/api/";
	// public BASE_URL = 'http://192.168.0.148/laravel/the_barber_multi/programati/public/api/';
	// public BASE_URL = "https://saasmonks.in/App-Demo/thebarber-V2/public/api/";
	paymentData: any;
	addressData: any;
	latitude: number;
	longitude: number;
	deviceToken: any;
	newLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	total: any = 0;
	salonId: any;
	salonDetail: any = {};
	distance: any;
	date: any;
	userLat: number;
	userLong: number;
	time: any;
	searchLat: any;
	searchLng: any;
	booking_at: any;
	extraCharges: any = 0;
	constructor(
		private http: HttpClient,
		private geolocation: Geolocation,
		private alertCtrl: AlertController
	) {}

	setNewLogin(val) {
		this.newLogin.next(val);
	}

	isNewLogin() {
		return this.newLogin.asObservable();
	}

	postCheckOutDetail(
		name,
		contact,
		city,
		state,
		country,
		address,
		price,
		quantity,
		product_id
	) {
		let header = new HttpHeaders();
		header = header.set(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		header = header.set("Accept", "application/json");
		return this.http
			.post(
				`${this.BASE_URL}place-order`,
				{
					name: name,
					contact: contact,
					city: city,
					state: state,
					country: country,
					address: address,
					price: price,
					quantity: quantity,
					product_id: product_id,
				},
				{ headers: header }
			)
			.toPromise();

		//return this.http.get(this.BASE_URL + url);
	}

	getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
		var dLon = this.deg2rad(lon2 - lon1);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) *
				Math.cos(this.deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c; // Distance in km
		return d;
	}
	getGeolocation() {
		this.geolocation
			.getCurrentPosition()
			.then((resp) => {
				this.latitude = resp.coords.latitude;
				this.longitude = resp.coords.longitude;
			})
			.catch((error) => {
				alert("Error getting location" + JSON.stringify(error));
			});
	}

	async getLocation() {
		const position = await this.geolocation.getCurrentPosition();
		this.latitude = position.coords.latitude;
		this.longitude = position.coords.longitude;
		console.log("this.lattitude in lattitude function", this.latitude);
		console.log("this.longitude in longitude", this.longitude);
	}

	async showAlert(title, msg, task) {
		const alert = await this.alertCtrl.create({
			header: title,
			subHeader: msg,
			buttons: [
				{
					text: `Action: ${task}`,
					handler: () => {
						// E.g: Navigate to a specific screen
					},
				},
			],
		});
		alert.present();
	}

	deg2rad(deg) {
		return deg * (Math.PI / 180);
	}
	storePaymentData(data) {
		this.paymentData = data;
	}
	getPaymentData() {
		return this.paymentData;
	}

	getData(url) {
		return this.http.get(this.BASE_URL + url);
	}

	postData(url, data) {
		return this.http.post(this.BASE_URL + url, data);
	}
	// header = header.set(
	//   "Authorization",
	//   "Bearer " + localStorage.getItem("token")
	// );
	getDataWithToken(url) {
		// localStorage.removeItem("token");
		// localStorage.setItem(
		// 	"token",
		// 	"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzc0ODUzZDc5MjkwZDk0NWQ1YzUyMzhjZmEyMWM2MDU3NjM5ZWFlMzQ0M2E1YzE5ZmM3YjI1MTljNjI4NDhlZTBhYzk5MTE2YjgzYmE5MDEiLCJpYXQiOjE2NDMzNjQ4NTUuNDgwMDc1LCJuYmYiOjE2NDMzNjQ4NTUuNDgwMDgyLCJleHAiOjE2NzQ5MDA4NTUuNDY4NjcyLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.shaRvkY46HuQtnoIx89Tm3B1rCPEke55bDzCX2EQYB5_7mVu4Y-_O7oQqqJ0F1541ib4ph5k7puhMUTe-i8UK_xn0QyWbx4sU4TRusI9daN0oZmhukDu2IrnQO87tcO_uQj4babmlfii60-aGnG4bluH-9uLukkss5hzHOqYcwwoH5IUDXe1ItjvpmvSVZY7tLnbAhG_em2nKwjk1rj47W45QJhQRXIp5sgRleRMyK0n31TUs5tva5eJNsRVwygpH673Z4zV5gEprqlOVeT_plsfGQo6dYNV2ZtETHiCo8-bfoYj2D6QMoywJu36N2NRzdbbkWC0VWmnD-urj7FsOdugIy2b_bBjd8ysJ5d7F7Hsle-T7-gff8r8zD9baH38fCcbxjDiIxad65ZBPTdprufM98zJdI6doUjxjiSPNtFNkl75g_9VMve415hlOnPLvCojw-DMVsrrABsSlz8-YUAgjCcPKkOJcow2H9PyegFDmenoJV_1O7MomtLYBiBXtwrlo9-qIEvwMQTGe2roZrTTCl1onkT2H0zoAUNB2CkYgLwxLt7e1nEOdIPeYeOm00t_8fbfNL_szyl40lKMIr1m3jJux6U0YAi1up6WK1Qcjn4KAE8HEMghexsFIPfy1gRUaInd9Bi6TmxP8lFhUsZG9M92trm_IPwbZG4hf1s_"
		// );
		let header = new HttpHeaders();
		header = header.set(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);

		header = header.set("Accept", "application/json");
		return this.http.get(this.BASE_URL + url, { headers: header });
	}

	getDataIdWithToken(url, id) {
		let header = new HttpHeaders();
		header = header.set(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		header = header.set("Accept", "application/json");
		return this.http.get(this.BASE_URL + url + "/" + id, { headers: header });
	}

	postDataWithToken(url, data) {
		let header = new HttpHeaders();
		header = header.set(
			"Authorization",
			"Bearer " + localStorage.getItem("token")
		);
		header = header.set("Accept", "application/json");
		return this.http.post(this.BASE_URL + url, data, { headers: header });
	}
}

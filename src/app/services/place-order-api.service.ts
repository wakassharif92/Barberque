import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BehaviorSubject } from "rxjs";
import { AlertController } from "@ionic/angular";

@Injectable({
	providedIn: "root",
})
export class PlaceOrderApiService {
	public BASE_URL = "http://66.45.36.13/TheBarberAdmin/public/api/";

	constructor(private http: HttpClient) {}
	async postCheckOutDetail(
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
		let msg;
		await this.http
			.post(`${this.BASE_URL}place-order`, {
				name: name,
				contact: contact,
				city: city,
				state: state,
				country: country,
				address: address,
				price: price,
				quantity: quantity,
				product_id: product_id,
			})
			.toPromise()
			.then((date: any) => {
				msg = "true";
			})
			.catch((error: any) => {
				msg = error.message;
				return msg;
			});
		return msg;

		//return this.http.get(this.BASE_URL + url);
	}
}

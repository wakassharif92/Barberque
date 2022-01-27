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

	// async postDataWithToken(url, data) {
	// 	let header = new HttpHeaders();
	// 	header = header.set("Authorization", "Bearer " + localStorage.getItem('token'));
	// 	header = header.set("Accept", "application/json");
	// 	await  this.http.post(this.BASE_URL + url, data, { headers: header });
	//   }
	
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BehaviorSubject } from "rxjs";
import { AlertController } from "@ionic/angular";
@Injectable({
	providedIn: "root",
})
export class ApiSalonProductService {
	public BASE_URL = "http://66.45.36.13/TheBarberAdmin/public/api/";
	constructor(private http: HttpClient) {}
	getData(url) {
		return this.http.get(this.BASE_URL + url);
	}
}

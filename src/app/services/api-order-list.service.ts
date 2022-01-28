import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
	providedIn: "root",
})
export class ApiOrderListService {
	public BASE_URL = "http://66.45.36.13/TheBarberAdmin/public/api/";
	constructor(private http: HttpClient) {}
	getData(url) {
		return this.http.get(this.BASE_URL + url);
	}
}

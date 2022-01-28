import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.page.html",
	styleUrls: ["./orders.page.scss"],
})
export class OrdersPage implements OnInit {
	cartCounter: any;
	constructor(private navCtrl: NavController) {}

	ngOnInit() {}
	openCart() {
		this.navCtrl.navigateForward("/cart");
	}
	openOrderDetail() {
		this.navCtrl.navigateForward("/orderdetail");
	}
}

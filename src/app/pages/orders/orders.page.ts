import { Component, OnInit } from "@angular/core";
import { NavigationExtras } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.page.html",
	styleUrls: ["./orders.page.scss"],
})
export class OrdersPage implements OnInit {
	ordersList: any;
	quantity: any;
	totalPrice: any;
	productPrice: any;
	constructor(private navCtrl: NavController, private apiSvc: ApiService) {}

	ngOnInit() {
		this.getOrdersList();
	}
	openCart() {
		this.navCtrl.navigateForward("/cart");
	}
	openOrderDetail(orderData) {
		let navigationExtras: NavigationExtras = {
			state: {
				name: orderData.name,
				address: orderData.address,
				contact: orderData.contact,
				country: orderData.country,
				state: orderData.state,
				city: orderData.city,
				quantity: orderData.quantity,
				price: orderData.price,
				totalPrice: orderData.total_price,
				trackingNo: orderData.tracking_no,
				status: orderData.open,
				orderCreated: orderData.created_at,
			},
		};
		this.navCtrl.navigateForward(["/orderdetail"], navigationExtras);
		//this.navCtrl.navigateForward("/orderdetail", navigationExtras);
	}
	getOrdersList() {
		this.apiSvc
			.getDataWithToken("orders-list?status=1")
			.subscribe((mdata: any) => {
				this.ordersList = mdata.data;

				console.log(this.ordersList);
			});
	}
}

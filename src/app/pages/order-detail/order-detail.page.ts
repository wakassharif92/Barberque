import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
@Component({
	selector: "app-order-detail",
	templateUrl: "./order-detail.page.html",
	styleUrls: ["./order-detail.page.scss"],
})
export class OrderDetailPage implements OnInit {
	ordersList: any;
	quantity: any;
	totalPrice: any;
	productPrice: any;
	constructor(private apiSvc: ApiService) {}

	ngOnInit() {
		this.getOrdersList();
	}
	getOrdersList() {
		this.apiSvc
			.getDataWithToken("orders-list?status=1")
			.subscribe((mdata: any) => {
				this.ordersList = mdata.data[0];
				this.quantity = this.ordersList.quantity;
				this.totalPrice = this.ordersList.price;
				this.productPrice = this.ordersList.price;
				for (var i = 0; i <= this.quantity; i++) {
					this.totalPrice = this.productPrice + this.totalPrice;
					console.log(this.totalPrice);
				}
				console.log(this.ordersList);
			});
	}
}

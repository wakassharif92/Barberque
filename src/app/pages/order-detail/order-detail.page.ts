import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
@Component({
	selector: "app-order-detail",
	templateUrl: "./order-detail.page.html",
	styleUrls: ["./order-detail.page.scss"],
})
export class OrderDetailPage implements OnInit {
	orderInfo: any;
	name: any;
	address: any;
	contact: any;
	email: any;
	country: any;
	state: any;
	city: any;
	trackingNo: any;
	quantity: any;
	totalPrice: any;
	price: any;
	createdDate: any;
	status: any;

	constructor(
		private apiSvc: ApiService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			if (this.router.getCurrentNavigation().extras.state) {
				this.name = this.router.getCurrentNavigation().extras.state.name;
				this.address = this.router.getCurrentNavigation().extras.state.address;
				this.contact = this.router.getCurrentNavigation().extras.state.contact;
				this.email = this.router.getCurrentNavigation().extras.state.email;
				this.country = this.router.getCurrentNavigation().extras.state.country;
				this.state = this.router.getCurrentNavigation().extras.state.state;
				this.city = this.router.getCurrentNavigation().extras.state.city;
				this.totalPrice =
					this.router.getCurrentNavigation().extras.state.totalPrice;
				this.price = this.router.getCurrentNavigation().extras.state.price;
				this.quantity =
					this.router.getCurrentNavigation().extras.state.quantity;
				this.trackingNo =
					this.router.getCurrentNavigation().extras.state.trackingNo;
				this.createdDate =
					this.router.getCurrentNavigation().extras.state.orderCreated;
				this.status = this.router.getCurrentNavigation().extras.state.status;
			}
		});
		console.log(this.name);
	}
	getOrdersList() {
		this.apiSvc
			.getDataWithToken("orders-list?status=1")
			.subscribe((mdata: any) => {
				this.orderInfo = mdata.data;
				this.name = this.orderInfo.name;
				this.address = this.orderInfo.address;
				this.contact = this.orderInfo.contact;
				this.email = this.orderInfo.email;
				this.country = this.orderInfo.country;
				this.state = this.orderInfo.state;
				this.city = this.orderInfo.city;
				this.totalPrice = this.orderInfo.total_price;
				this.price = this.orderInfo.price;
				this.quantity = this.orderInfo.quantity;
				this.trackingNo = this.orderInfo.tracking_no;
				console.log(this.orderInfo);
			});
	}
}

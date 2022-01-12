import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiSalonProductService } from "src/app/services/api-salon-product.service";
@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.page.html",
	styleUrls: ["./product-detail.page.scss"],
})
export class ProductDetailPage implements OnInit {
	productId: any;
	data: any;
	photo: any;
	productList: any;

	constructor(
		private navCtrl: NavController,
		private apisalon: ApiSalonProductService
	) {}

	ngOnInit() {
		this.productId = JSON.parse(localStorage.getItem("productID"));
		//	this.productId = localStorage.getItem("productID");
		this.getSalonProductByID();
	}
	goToCart() {
		this.navCtrl.navigateForward("/cart");
	}
	getSalonProductByID() {
		this.apisalon.getData("salon-product/" + 1).subscribe((mdata: any) => {
			this.productList = mdata.data[0];
			//	console.log(this.productList);
		});
	}
	backs() {
		localStorage.removeItem("productID");
		this.navCtrl.navigateForward("/tabs/home/salon-profile");
	}
}

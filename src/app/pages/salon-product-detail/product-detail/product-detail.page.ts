import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
@Component({
	selector: "app-product-detail",
	templateUrl: "./product-detail.page.html",
	styleUrls: ["./product-detail.page.scss"],
})
export class ProductDetailPage implements OnInit {
	productDetail: any = [];
	data: any;
	photo: any;
	currencyType: any;
	cartCounter: any;
	productList: any;
	productID: any;
	productImages: any;
	productPrice: any;
	productTitle: any;
	localstoragedata: any;
	productDescription: any;

	slideOpts = {
		slidesPerView: 1,
		initialSlide: 0,
		speed: 400,
	};
	sliderOnePager: boolean = true;

	constructor(
		private navCtrl: NavController,
		private apiSvc: ApiService,
		public toastController: ToastController
	) {}

	ngOnInit() {
		// this.cartCounter = JSON.parse(localStorage.getItem("addProducts"));
		// if (this.cartCounter) {
		// 	this.cartCounter = this.cartCounter.length;
		// } else {
		// 	this.cartCounter = 0;
		// }
		this.currencyType = "$";
		this.productDetail = JSON.parse(localStorage.getItem("productDetail"));
		this.productID = this.productDetail.id;
		this.productImages = this.productDetail.image;
		this.productPrice = this.productDetail.price;
		this.productTitle = this.productDetail.title;
		this.productDescription = this.productDetail.description;
		this.getSalonProductByID();
	}

	ionViewWillEnter() {
		this.cartCounter = JSON.parse(localStorage.getItem("addProducts"));
		console.log("cart counter", this.cartCounter);
		if (this.cartCounter) {
			this.cartCounter = this.cartCounter.length;
		} else {
			this.cartCounter = 0;
		}
	}

	async presentToast() {
		const toast = await this.toastController.create({
			message: "Product has been already added.",
			duration: 2000,
		});
		toast.present();
	}
	openCart() {
		this.navCtrl.navigateForward("/cart");
	}

	async presentToastCartHasProducts() {
		const toast = await this.toastController.create({
			// header: "Toast header",
			message: "Cart cannot contain multiple products",
			position: "bottom",
			buttons: [
				{
					side: "start",
					icon: "cart",
					//	text: "Open Cart",
					handler: () => {
						this.navCtrl.navigateForward("/cart");
					},
				},
				{
					text: "Close",
					role: "cancel",
					handler: () => {
						console.log("Cancel clicked");
					},
				},
			],
		});
		await toast.present();

		const { role } = await toast.onDidDismiss();
		console.log("onDidDismiss resolved with role", role);
	}
	goToCart() {
		var checkCartLength = localStorage.getItem("addProducts");
		if (checkCartLength) {
			this.presentToastCartHasProducts();
		} else {
			let products = [];
			if (localStorage.getItem("addProducts")) {
				products = JSON.parse(localStorage.getItem("addProducts"));
			}

			this.localstoragedata = localStorage.getItem("addProducts");
			if (this.localstoragedata) {
				this.localstoragedata = JSON.parse(this.localstoragedata);
				for (var i = 0; i < this.localstoragedata.length; i++) {
					if (this.localstoragedata[i].id == this.productID) {
						this.presentToast();
						//	console.log("matched product");
					} else {
						//console.log("new product");
						products.push({
							id: this.productID,
							image: this.productImages[0].image,
							title: this.productTitle,
							description: this.productDescription,
							price: this.productPrice,
							quantity: 1,
						});
						localStorage.setItem("addProducts", JSON.stringify(products));
						this.navCtrl.navigateForward("/cart");
					}
				}
			} else {
				console.log("new product");
				products.push({
					id: this.productID,
					image: this.productImages[0].image,
					title: this.productTitle,
					description: this.productDescription,
					price: this.productPrice,
					quantity: 1,
				});
				localStorage.setItem("addProducts", JSON.stringify(products));
				this.navCtrl.navigateForward("/cart");
				//	console.log("Add in Cart:" + JSON.stringify(products));
			}
		}
	}
	getSalonProductByID() {
		this.apiSvc.getData("salon-product/" + 1).subscribe((mdata: any) => {
			this.productList = mdata.data[0];
			//	console.log(this.productList);
		});
	}
}

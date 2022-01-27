import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.page.html",
	styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
	showBottomBar = false;
	testVar: any;
	currencyType: any;
	totalPrice = 0;
	public itemQuantity = 1;
	productDetail: any;
	tempArray: any = [];
	productQuantity: any;
	productsList: any;
	selectedItem: any;
	productID: any;
	productImage: any;
	productPrice = 0;
	productTitle: any;
	itemIndex: any;

	storageProducts: any;
	productDescription: any;
	constructor(private navCtrl: NavController, private apiSvc: ApiService) {
		this.getCartItems();
	}
	// getTotal(pPrice) {
	// 	this.totalPrice = pPrice;
	// }
	getCartItems() {
		this.totalPrice = 0;
		this.storageProducts = JSON.parse(localStorage.getItem("addProducts"));
		if (this.storageProducts) {
			this.showBottomBar = true;
			for (var i = 0; i < this.storageProducts.length; i++) {
				//console.log("Price: " + this.storageProducts[i].price);
				this.totalPrice = this.totalPrice + this.storageProducts[i].price;
				//console.log(this.productPrice + this.storageProducts[i].price);
			}
			// console.log("cart Testing: " + this.storageProducts[0].id);
			// console.log("cart Image: " + this.storageProducts[0].image);
		} else {
			this.showBottomBar = false;
			//console.log("cart is null");
		}
	}
	ngOnInit() {
		this.currencyType = "$";
	}
	removeItem(pId) {
		this.tempArray = [];
		this.selectedItem = localStorage.getItem("addProducts");
		console.log("cart: " + this.selectedItem);
		if (this.selectedItem) {
			this.selectedItem = JSON.parse(this.selectedItem);
			console.log("after parsing: " + this.selectedItem);
			for (var i = 0; i < this.selectedItem.length; i++) {
				if (this.selectedItem[i].id == pId) {
					// console.log(this.testArray);
					// console.log("removed item detected:" + pId);
				} else {
					this.tempArray.push({
						id: this.selectedItem[i].id,
						title: this.selectedItem[i].title,
						image: this.selectedItem[i].image,
						description: this.selectedItem[i].description,
						price: this.selectedItem[i].price,
						quantity: this.selectedItem[i].quantity,
					});
				}
			}
			if (this.tempArray.length == 0) {
				localStorage.removeItem("addProducts");
				this.getCartItems();
			} else {
				this.tempArray = JSON.stringify(this.tempArray);
				localStorage.removeItem("addProducts");
				localStorage.setItem("addProducts", this.tempArray);
				this.getCartItems();
			}
		}
	}

	public increement(pID) {
		this.tempArray = [];
		this.selectedItem = localStorage.getItem("addProducts");
		if (this.selectedItem) {
			this.selectedItem = JSON.parse(this.selectedItem);
			for (var i = 0; i < this.selectedItem.length; i++) {
				if (this.selectedItem[i].id == pID) {
					this.productQuantity =
						this.selectedItem[i].price / this.selectedItem[i].quantity;

					this.tempArray.push({
						id: this.selectedItem[i].id,
						title: this.selectedItem[i].title,
						image: this.selectedItem[i].image,
						description: this.selectedItem[i].description,
						price: this.selectedItem[i].price + this.productQuantity,
						quantity: this.selectedItem[i].quantity + 1,
					});
				} else {
					this.tempArray.push({
						id: this.selectedItem[i].id,
						title: this.selectedItem[i].title,
						image: this.selectedItem[i].image,
						description: this.selectedItem[i].description,
						price: this.selectedItem[i].price,
						quantity: this.selectedItem[i].quantity,
					});
				}
			}
			if (this.tempArray.length == 0) {
				localStorage.removeItem("addProducts");
				this.getCartItems();
			} else {
				this.tempArray = JSON.stringify(this.tempArray);
				localStorage.removeItem("addProducts");
				localStorage.setItem("addProducts", this.tempArray);
				this.getCartItems();
			}
		}
	}
	public decreement(pID) {
		this.tempArray = [];
		this.selectedItem = localStorage.getItem("addProducts");
		if (this.selectedItem) {
			this.selectedItem = JSON.parse(this.selectedItem);
			for (var i = 0; i < this.selectedItem.length; i++) {
				if (this.selectedItem[i].id == pID) {
					this.productQuantity =
						this.selectedItem[i].price / this.selectedItem[i].quantity;
					//this.selectedItem[i].quantity = +1;
					if (this.selectedItem[i].quantity == 1) {
						this.tempArray.push({
							id: this.selectedItem[i].id,
							title: this.selectedItem[i].title,
							image: this.selectedItem[i].image,
							description: this.selectedItem[i].description,
							price: this.selectedItem[i].price,
							quantity: this.selectedItem[i].quantity,
						});
					} else {
						this.tempArray.push({
							id: this.selectedItem[i].id,
							title: this.selectedItem[i].title,
							image: this.selectedItem[i].image,
							description: this.selectedItem[i].description,
							price: this.selectedItem[i].price - this.productQuantity,
							quantity: this.selectedItem[i].quantity - 1,
						});
					}
				} else {
					this.tempArray.push({
						id: this.selectedItem[i].id,
						title: this.selectedItem[i].title,
						image: this.selectedItem[i].image,
						description: this.selectedItem[i].description,
						price: this.selectedItem[i].price,
						quantity: this.selectedItem[i].quantity,
					});
				}
			}
			if (this.tempArray.length == 0) {
				localStorage.removeItem("addProducts");
				this.getCartItems();
			} else {
				this.tempArray = JSON.stringify(this.tempArray);
				localStorage.removeItem("addProducts");
				localStorage.setItem("addProducts", this.tempArray);
				this.getCartItems();
			}
		}
	}

	goToCheckOut() {
		this.navCtrl.navigateForward("/checkout");
	}
}

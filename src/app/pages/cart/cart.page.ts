import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
@Component({
	selector: "app-cart",
	templateUrl: "./cart.page.html",
	styleUrls: ["./cart.page.scss"],
})
export class CartPage implements OnInit {
	public currentNumber = 1;

	constructor(private navCtrl: NavController) {}

	ngOnInit() {}
	public increement() {
		this.currentNumber++;
	}
	public decreement() {
		if (this.currentNumber != 1) {
			this.currentNumber--;
		}
	}

	backs() {
		this.navCtrl.navigateForward("/product-detail");
	}
	goToCheckOut() {
		this.navCtrl.navigateForward("/checkout");
	}
}

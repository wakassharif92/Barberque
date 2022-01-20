import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PlaceOrderApiService } from "src/app/services/place-order-api.service";
@Component({
	selector: "app-checkout",
	templateUrl: "./checkout.page.html",
	styleUrls: ["./checkout.page.scss"],
})
export class CheckoutPage implements OnInit {
	cartItemsDetails: any;
	myForm: FormGroup;
	showSpinner = false;
	submitted = false;
	constructor(
		private navCtrl: NavController,
		public formBuilder: FormBuilder,
		public ApiPlaceOrderDetail: PlaceOrderApiService
	) {
		this.myForm = this.formBuilder.group({
			name: ["", [Validators.required, Validators.minLength(3)]],
			city: ["", [Validators.required, Validators.minLength(3)]],
			state: ["", [Validators.required, Validators.minLength(3)]],
			country: ["", [Validators.required, Validators.minLength(3)]],
			address: ["", [Validators.required, Validators.minLength(3)]],

			// dob: [],
			phone: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
			// email: [
			// 	"",
			// 	[
			// 		Validators.required,
			// 		Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
			// 	],
			// ],
		});
	}

	ngOnInit() {}
	backs() {
		this.navCtrl.navigateForward("/cart");
	}
	fetchDate(e) {
		let date = new Date(e.target.value).toISOString().substring(0, 10);
		this.myForm.get("dob").setValue(date, {
			onlyself: true,
		});
	}

	get errorCtr() {
		return this.myForm.controls;
	}

	async onSubmit() {
		this.submitted = true;
		if (!this.myForm.valid) {
			console.log("All fields are required.");
			return false;
		} else {
			this.showSpinner = true;
			//console.log(this.myForm.value);
			this.cartItemsDetails = localStorage.getItem("addProducts");
			//console.log(this.cartItemsDetails);
			//this.cartItemsDetails = JSON.parse(this.cartItemsDetails);
			console.log(this.cartItemsDetails[0].id);
			const name = this.myForm.get("name").value;
			const contact = this.myForm.get("phone").value;
			const city = this.myForm.get("city").value;
			const state = this.myForm.get("state").value;
			const country = this.myForm.get("country").value;
			const address = this.myForm.get("address").value;
			const product_id = this.cartItemsDetails[0].id;
			const price = this.cartItemsDetails[0].price;
			const quantity = this.cartItemsDetails[0].quantity;

			const res = await this.ApiPlaceOrderDetail.postCheckOutDetail(
				name,
				contact,
				city,
				state,
				country,
				address,
				price,
				quantity,
				product_id
			);
			this.showSpinner = false;
			// if (res === "true") {
			// } else {
			// }
		}
	}
}

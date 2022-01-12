import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
	selector: "app-checkout",
	templateUrl: "./checkout.page.html",
	styleUrls: ["./checkout.page.scss"],
})
export class CheckoutPage implements OnInit {
	myForm: FormGroup;
	submitted = false;
	constructor(private navCtrl: NavController, public formBuilder: FormBuilder) {
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

	onSubmit() {
		this.submitted = true;
		if (!this.myForm.valid) {
			console.log("All fields are required.");
			return false;
		} else {
			console.log(this.myForm.value);
		}
	}
}

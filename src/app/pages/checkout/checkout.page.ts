import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Stripe } from "@awesome-cordova-plugins/stripe/ngx";
import {
	InAppBrowser,
	InAppBrowserOptions,
} from "@ionic-native/in-app-browser/ngx";
@Component({
	selector: "app-checkout",
	templateUrl: "./checkout.page.html",
	styleUrls: ["./checkout.page.scss"],
})
export class CheckoutPage implements OnInit {
	myForm: FormGroup;
	submitted = false;
	constructor(private navCtrl: NavController, public formBuilder: FormBuilder, private stripe: Stripe, private platform: Platform, private theInAppBrowser: InAppBrowser) {
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

	proceedToPay() {

		let target = "_system";
		this.theInAppBrowser.create(
			'https://checkout.stripe.com/pay/cs_test_a1K5LGFzcUnZLacXx6kYGAHbUD0wlzTsMWT79qAIpWIUkBlT7UOFqiRrIB#fidkdWxOYHwnPyd1blpxYHZxWjA0Tjd8XHNEclRDU0Y8XTxDSn9iXWJud1w3Q0lWSVx3bWdTdXRMR2sxTXVwXTB9PWBWVH1AYkJ8SDxfdXBcf31NVTA0XENrXTY2dmMzYX90dkJccE5AZGdSNTVLS25VQE1UNScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl', 
			target, 'location=yes');
		
		// this.stripe.setPublishableKey('pk_test_51KI9b2L8RaO3dnB775xu3P4LYSqMTtR6wShoEP315rDTB0iEJ4RyaU5Hq5WlSWqRVqSFaeNfLXEZe6XruIir9eoQ00floIExa0');
	
		// let card = {
		//  number: '4242424242424242',
		//  expMonth: 12,
		//  expYear: 2025,
		//  cvc: '123'
		// }
		// this.stripe.validateCVC('123')
		// .then(() => console.log('valid number'))
		// .catch(error => console.error(error));
		// this.stripe.createCardToken(card)
		//    .then(token => console.log(token.id))
		//    .catch(error => console.error(error));
	}
}

import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { Stripe } from "@awesome-cordova-plugins/stripe/ngx";
import {
	InAppBrowser
} from "@ionic-native/in-app-browser/ngx";
import { PlaceOrderApiService } from "src/app/services/place-order-api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
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
	constructor(private navCtrl: NavController, public formBuilder: FormBuilder, /*private stripe: Stripe,*/ private platform: Platform, private theInAppBrowser: InAppBrowser
	,
		private utilSvc: UtilserviceService,
		public apiSvc: ApiService
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

	ngOnInit() {
		try {
			(<any>window).handleOpenURL = (url: string) => {
				setTimeout(() => {
					
					// if (this.device.platform === 'iOS') {
					// 	this.browser.hide();
					// }
					this.stripeCheckout(url);
				}, 0);
			  };
		} catch(error) {
			console.error(error);
		}
	}
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
			try {
				this.showSpinner = true;
			this.cartItemsDetails = localStorage.getItem("addProducts");
			this.cartItemsDetails = JSON.parse(this.cartItemsDetails);
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

			const res: any = await this.apiSvc.postCheckOutDetail(
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
			// if (res)
			this.showSpinner = false;
			console.log(res);
			if (res.success) {
				let target = "_system";
				// this.theInAppBrowser.create(
				// 	'https://thebarberapp.com?checkout=success',
				// 	target, 'location=yes'
				// );
				this.theInAppBrowser.create(
					res.session_url, 
					target, 'location=yes');
			} else {
				this.utilSvc.presentToast(res.message);
			}
			} catch (error) {
				if (error.status == 401) {
					this.utilSvc.presentToast('Please login first to place order!');
				} else {
					this.utilSvc.presentToast(error.message);
				}
				this.showSpinner = false;
				console.error(error);
			}
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

	async stripeCheckout(url: string): Promise<void> {
		try {
		  const urlObject = new URL(`${url.split('#')[0]}`);
		  if (urlObject.protocol !== 'thebarberapp:') {
			return;
		  }
		  console.log('url search', urlObject.search);
		  const urlParams = url ? new URLSearchParams(urlObject.search) : undefined;
		  console.log('URL Params', urlParams);
		  const success = urlParams ? urlParams.get('checkout') : undefined;
		  console.log('success', success);;
		  if (success && success == 'success') {
			  localStorage.removeItem('addProducts');
			  this.navCtrl.navigateRoot('/');
		  }
		} catch (error) {
		  console.error(error);
		}
	  }
}

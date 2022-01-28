import { Component } from "@angular/core";
import {
	Platform,
	MenuController,
	NavController,
	ModalController,
	LoadingController,
	AlertController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { SocialiconPage } from "./modals/socialicon/socialicon.page";
import { ApiService } from "./services/api.service";
import { UtilserviceService } from "./services/utilservice.service";
import { AuthenticationService } from "./services/authentication.service";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { Network } from "@ionic-native/network/ngx";
import { Router } from "@angular/router";
import { Diagnostic } from "@ionic-native/diagnostic/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { LanguagePage } from "./modals/language/language.page";
import { TranslateService } from "@ngx-translate/core";
declare var window: any;
@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent {
	profilee: any = {};
	backButtonSubscription;
	timePeriodToExit = 2000;
	token: any;
	isUserLoggedIn: any;
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private menu: MenuController,
		private navCtrl: NavController,
		private modal: ModalController,
		private api: ApiService,
		private util: UtilserviceService,
		private authenticationService: AuthenticationService,
		private oneSignal: OneSignal,
		private network: Network,
		private diagnostic: Diagnostic,
		private alertCtrl: AlertController,
		private translate: TranslateService
	) {
		this.isUserLoggedIn = localStorage.getItem("isUserLogged");
		if (this.isUserLoggedIn == null) {
			this.isUserLoggedIn = false;
		}
		this.isUserLoggedIn = true; //for testing purpose, I'm enabling it. For production, make this line of code comment.
		console.log("Is User logged In: " + this.isUserLoggedIn);
		this.initializeApp();
		// console.log = function () {};
		localStorage.setItem("pushTokn", "i hate this");
		setTimeout(() => {
			this.translate.get("SelectLanguage.label").subscribe((data: any) => {
				this.option.header = data;
			});
		}, 500);
		this.backButtonEvent();
		let lan = localStorage.getItem("lan");
		if (this.network.type === "none") {
			if (lan == "en") {
				this.util.presentToast("Network was disconnected :-(");
			} else if (lan == "ar") {
				this.util.presentToast("انقطع الاتصال بالشبكة :-(");
			} else {
				this.util.presentToast("Rețeaua a fost deconectată :-(");
			}
		}
		this.util.startLoad();
		if (localStorage.getItem("token")) {
			this.navCtrl.navigateRoot("tabs/home");
		} else {
			this.navCtrl.navigateRoot("tabs/home");
		}
		this.diagnostic.isGpsLocationEnabled().then(async (isEnabled) => {
			console.log("inside enabled");
			if (!isEnabled) {
				let alertttt = this.alertCtrl.create({
					header: "GPS Location",
					message: "For Best Result Turn on Your Location ",
					buttons: [
						{
							text: "cancel",
							role: "Cancel",
							handler: () => {
								this.util.dismissLoader();
							},
						},
						{
							text: "Ok",
							handler: () => {
								this.diagnostic.switchToLocationSettings();
							},
						},
					],
				});
				await (await alertttt).present();
			}
		});
		this.api.getDataWithToken("profile").subscribe(
			(success: any) => {
				if (success.success) {
					this.profilee = success.data;
					this.util.dismissLoader();
				}
			},
			(error) => {
				this.util.dismissLoader();
			}
		);
		this.api.isNewLogin().subscribe((d) => {
			console.log("event recived!");
			setTimeout(() => {
				this.token = localStorage.getItem("token")
					? localStorage.getItem("token")
					: "";
				if (d) {
					this.api.getDataWithToken("profile").subscribe(
						(success: any) => {
							if (success.success) {
								this.profilee = success.data;
							}
						},
						(error) => {}
					);
				}
			}, 500);
		});

		if (localStorage.getItem("lan")) {
			this.translate.setDefaultLang(localStorage.getItem("lan"));
			if (localStorage.getItem("lan") == "ar") {
				document.documentElement.dir = "rtl";
			}
			if (localStorage.getItem("lan") == "en") {
				document.documentElement.dir = "ltr";
			}
			if (localStorage.getItem("lan") == "ro") {
				document.documentElement.dir = "ltr";
			}
		} else {
			this.translate.setDefaultLang("en");
			localStorage.setItem("lan", "en");
			document.documentElement.dir = "ltr";
		}
	}

	languageChanged() {
		localStorage.setItem("lan", this.languages);
		this.translate.setDefaultLang(this.languages);
		if (localStorage.getItem("lan") == "en") {
			document.documentElement.dir = "ltr";
			this.menu.close();
			this.navCtrl.navigateForward("tabs/home");
		}
		if (localStorage.getItem("lan") == "ar") {
			document.documentElement.dir = "rtl";
			this.menu.close();
			this.navCtrl.navigateForward("tabs/home");
		}
		if (localStorage.getItem("lan") == "ro") {
			document.documentElement.dir = "ltr";
			this.menu.close();
			this.navCtrl.navigateForward("tabs/home");
		}
	}
	option: any = {
		header: "Language",
	};
	languages: any = localStorage.getItem("lan");

	async presentModal() {
		this.util.startLoad();
		this.menu.close();
		const modal = await this.modal.create({
			component: SocialiconPage,
			cssClass: "social-icon",
		});
		this.util.dismissLoader();
		return await modal.present();
	}
	public styles = [
		{
			elementType: "geometry",
			stylers: [
				{
					color: "#f5f5f5",
				},
			],
		},
		{
			elementType: "labels.icon",
			stylers: [
				{
					visibility: "off",
				},
			],
		},
		{
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161",
				},
			],
		},
		{
			elementType: "labels.text.stroke",
			stylers: [
				{
					color: "#f5f5f5",
				},
			],
		},
		{
			featureType: "administrative.land_parcel",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#bdbdbd",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee",
				},
			],
		},
		{
			featureType: "poi",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "geometry",
			stylers: [
				{
					color: "#e5e5e5",
				},
			],
		},
		{
			featureType: "poi.park",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
		{
			featureType: "road",
			elementType: "geometry",
			stylers: [
				{
					color: "#ffffff",
				},
			],
		},
		{
			featureType: "road.arterial",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#757575",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "geometry",
			stylers: [
				{
					color: "#dadada",
				},
			],
		},
		{
			featureType: "road.highway",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#616161",
				},
			],
		},
		{
			featureType: "road.local",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
		{
			featureType: "transit.line",
			elementType: "geometry",
			stylers: [
				{
					color: "#e5e5e5",
				},
			],
		},
		{
			featureType: "transit.station",
			elementType: "geometry",
			stylers: [
				{
					color: "#eeeeee",
				},
			],
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{
					color: "#c9c9c9",
				},
			],
		},
		{
			featureType: "water",
			elementType: "labels.text.fill",
			stylers: [
				{
					color: "#9e9e9e",
				},
			],
		},
	];

	backButtonEvent() {
		this.platform.backButton.subscribe(() => {
			if (window.location.pathname == "/tabs/home") {
				navigator["app"].exitApp();
			}
		});
	}

	about() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/home/about");
	}
	terms() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/home/terms");
	}
	privacy() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/home/privacy");
	}

	logout() {
		this.authenticationService.logout();
		this.api.newLogin.next(true);
	}

	profile() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/profile");
	}

	async language() {
		const modal = await this.modal.create({
			component: LanguagePage,
			cssClass: "languageSelect",
		});
		modal.onDidDismiss().then((res) => {
			this.menu.close();
			this.navCtrl.navigateForward("tabs/home");
		});
		return modal.present();
	}

	offers() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/home/offers");
	}
	orders() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/home/orders");
	}

	services() {
		this.menu.close();
		this.navCtrl.navigateForward("tabs/home/service");
	}

	openFirst() {
		this.menu.enable(true, "first");
		this.menu.open("first");
	}

	openEnd() {
		this.menu.open("end");
	}

	openCustom() {
		this.menu.enable(true, "custom");
		this.menu.open("custom");
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.statusBar.backgroundColorByHexString("#e06287");
			setTimeout(() => {
				this.splashScreen.hide();
			}, 1000);
			setTimeout(() => {
				this.api.getData("settings").subscribe(
					(res: any) => {
						if (res.success) {
							let curency = res.data.currency_symbol;
							let imagePath = res.data.imagePath;
							let whiteImage = res.data.white_logo;
							let blacklogo = res.data.black_logo;
							let mapkey = res.data.mapkey;
							console.log(mapkey);

							const fileSrc = `<script
src="https://maps.googleapis.com/maps/api/js?key=${mapkey}"
async
></script>
`;
							const head = document.getElementsByTagName("head")[0];
							const script = document.createElement("script");
							script.type = "text/javascript";
							script.src = fileSrc;
							head.appendChild(script);

							localStorage.setItem("mapkey", mapkey);
							localStorage.setItem("currency", curency);
							localStorage.setItem("imagePath", imagePath);
							localStorage.setItem("whitelogo", whiteImage);
							localStorage.setItem("blacklogo", blacklogo);
							localStorage.setItem("keyStri", res.data.stripe_public_key);
							if (this.platform.is("cordova")) {
								this.oneSignal.startInit(res.data.app_id, res.data.project_no);
								this.oneSignal
									.getIds()
									.then((ids) => (this.api.deviceToken = ids.userId));
								this.oneSignal.endInit();
							} else {
								this.api.deviceToken = null;
							}
						}
					},
					(err) => {}
				);
			}, 2000);
		});
	}
}

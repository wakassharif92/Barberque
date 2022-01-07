import { Component, OnInit } from "@angular/core";
import {
  NavController,
  ModalController,
  Platform,
  MenuController,
} from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ApiService } from "src/app/services/api.service";
import { LoginPage } from "../login/login.page";
import { Network } from "@ionic-native/network/ngx";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  profile: any = {};
  upComingAppointment: any = [];
  oldPassword: string = "";
  new_Password: string = "";
  confirm: string = "";
  token: string;
  netCheck: any;
  confirmError: any;
  oldPasswordError: any;
  passwordError: any;
  successfalse: any;
  err: any;
  newPassError: any;
  ispoint: any;
  refralpoint: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private netWork: Network,
    private menuController: MenuController,
    private translate: TranslateService
  ) {
    this.netCheck = this.netWork.type;
    this.backButtonEvent();
  }

  async ngOnInit() {
    this.util.startLoad();
    this.netCheck = this.netWork.type;

    this.api.getDataWithToken("settings").subscribe((data: any) => {
      this.ispoint = data.data.is_point_package;
      this.util.dismissLoader();
    }, (err: any) => {
      console.log(err);
      this.util.dismissLoader();
    });
  }

  async ionViewWillLeave() {
    this.backButtonEvent();
  }

  async ionViewWillEnter() {

    this.api.getDataWithToken("settings").subscribe((data: any) => {
      this.ispoint = data.data.is_point_package;
      this.refralpoint = data.data.referral_point;      
      this.util.dismissLoader();
    }, (err: any) => {
      console.log(err);
      this.util.dismissLoader();
    });

    this.menuController.swipeGesture(false);
    this.new_Password = "";
    this.confirm = "";
    this.oldPassword = "";
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token !== "") {
      this.api.getDataWithToken("profile").subscribe((success: any) => {
        if (success.success) {
          this.profile = success.data;
          // console.log(this.profile);
          
          this.util.dismissLoader();
        }
      });
    }
    this.token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (this.token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem("previous-request-page", "tabs/profile");
      let model = await this.modalCtrl.create({
        component: LoginPage,
      });
      model.present();
      model.onDidDismiss().then(() => {
        this.api.getDataWithToken("profile").subscribe(
          (success: any) => {
            if (success.success) {
              this.profile = success.data;
              // console.log("success",success);
              
              this.util.dismissLoader();
            }
          },
          (err) => {
            this.util.dismissLoader();
          }
        );
      });
    }
    let hasPre = localStorage.getItem("previous-request")
      ? localStorage.getItem("previous-request")
      : false;
    let prePage = localStorage.getItem("previous-request-page")
      ? localStorage.getItem("previous-request-page")
      : "";
    if (hasPre == "true" && prePage == "tabs/profile") {
      localStorage.setItem("previous-request", "false");
    }
  }

  changePass() {
    let translateData: any;
    let tData: any;

    this.translate.get("errors").subscribe((data: any) => {
      translateData = data;
      // console.log("translate",translateData);
      
    });

    this.util.startLoad();
    let data = {
      oldPassword: this.oldPassword,
      new_Password: this.new_Password,
      confirm: this.confirm,
    };
    this.api.postDataWithToken("changepassword", data).subscribe(
      (success: any) => {
        this.successfalse = success.success;
        if (success.success) {
          this.util.presentToast("Password Changed Successfully");
          this.navCtrl.navigateRoot("tabs/home");
          localStorage.setItem("token", success.data.token);
          this.util.dismissLoader();
          this.oldPassword = "";
          this.confirm = "";
          this.new_Password = "";
        }
      },
      (error) => {
        if (this.new_Password.length <= 8) {
        }
        if (error.status == 422) {
          this.err = error.error.errors;
          // console.log("api err",this.err);
          
          if (this.err.confirm[0] == "The confirm field is required.") {
            this.confirmError = translateData.confirmErr;
          }
          if (
            this.err.new_Password[0] == "The new  password field is required."
          ) {
            this.newPassError = translateData.passErr;
          }
          if (
            this.err.oldPassword[0] == "The old password field is required."
          ) {
            this.oldPasswordError = translateData.oldPassErr;
          }
        }

        this.util.dismissLoader();
      }
    );
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack("tabs/home");
    });
  }

  appointment() {
    this.navCtrl.navigateRoot("tabs/appointment");
  }

  search() {
    this.navCtrl.navigateForward("tabs/home/search");
  }
  
  editprofile() {
    this.navCtrl.navigateForward("tabs/profile/edit");
  }
}

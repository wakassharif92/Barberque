import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { ModalController, NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-coupon",
  templateUrl: "./coupon.page.html",
  styleUrls: ["./coupon.page.scss"],
})
export class CouponPage implements OnInit {
  @Input() salon_id: any;
  data: any = [];
  discount: any;
  code: any;
  coupon_id: any;
  type: any;
  slider: any = [];
  language: any;
  constructor(
    private api: ApiService,
    private util: UtilserviceService,
    private modal: ModalController,
    private translate: TranslateService,
    private nav: NavController
  ) {}
  ngOnInit() {
    this.language = localStorage.getItem("lan");

    this.util.startLoad();
    this.api.getData("offers").subscribe(
      (success: any) => {
        if (success.success) {
          this.slider = success.data;
          this.util.dismissLoader();
        }
      },
      (err) => {
        this.util.dismissLoader();
      }
    );
    let data = {
      salon_id: localStorage.getItem("Salon-id"),
    };
    this.api.getData("coupon").subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.data.forEach((element) => {
            this.discount = element.discount;
            this.code = element.code;
            this.coupon_id = element.coupon_id;
            this.type = element.type;

            this.util.dismissLoader();
          });
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }

  apply(c) {
    this.util.startLoad();
    let data = {
      code: c.code,
    };
    this.api.postDataWithToken("checkcoupon", data).subscribe(
      (success: any) => {
        if (success.success == true) {
          // console.log(success);

          let lan = localStorage.getItem("lan");
          if (lan == "en") {
            this.util.presentToast("Coupon Successfully Applied");
          } else if (lan == "ar") {
            this.util.presentToast("تم تطبيق القسيمة بنجاح");
          } else {
            this.util.presentToast("Cuponul a fost aplicat cu succes");
          }
          if (success.success == true) {
            this.modal.dismiss({
              dis: c.discount,
              coupon: c.coupon_id,
              type: c.type,
            });
            this.util.dismissLoader();
          }
          this.util.dismissLoader();
        } else {
          let lan = localStorage.getItem("lan");
          if (lan == "en") {
            this.util.presentToast("this coupen is expire");
          } else if(lan == "ar") {
            this.util.presentToast("تنتهي صلاحية هذه القسيمة");
          } else {
            this.util.presentToast("acest cupen expiră");
          }
          this.modal.dismiss();
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }

  backs() {
    this.modal.dismiss();
    this.nav.navigateForward("tabs/home/makepayment");
  }
}

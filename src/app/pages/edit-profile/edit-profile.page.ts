import { Component, OnInit, Sanitizer } from "@angular/core";
import { NavController, ActionSheetController, Platform } from "@ionic/angular";
import { UtilserviceService } from "src/app/services/utilservice.service";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApiService } from "src/app/services/api.service";
@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  base64Image: any;
  user_photo: any;
  data: any = {};
  id: any;
  name: string = "";
  phone: any;
  email: string = "";
  address: any = [];
  addressId: any;
  img: string;
  imageUri: any;
  isNewProfile: boolean;
  image: any;
  profilee: any;
  code: any;
  language: any;
  
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private sanitize: DomSanitizer,
    private api: ApiService,
    private platform: Platform
  ) {
    /* util.startLoad(); */
    this.backButtonEvent();
  }

  ngOnInit() {
    this.language = localStorage.getItem("lan");
  }

  ionViewWillEnter() {
    this.util.startLoad();
    this.api.getDataWithToken("profile").subscribe(
      (success: any) => {
        if (success.success) {
          this.data = success.data;
          this.image = success.data.imagePath + success.data.image;
          this.id = success.data.id;
          this.address = success.data.address;
          this.address.forEach((element) => {
            this.addressId = element.address_id;
          });
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }

  addAddres() {
    this.util.startLoad();
    this.navCtrl.navigateRoot("add-address");
    this.util.dismissLoader();
  }

  changeThis() {
    this.util.startLoad();
    let data = {
      name: this.name,
      phone: this.phone,
      image: this.imageUri,
      code: this.code,
    };
    this.api.postDataWithToken("profile/edit", data).subscribe(
      (success: any) => {
        if (success.success) {
          if (this.language == "en") {
            this.util.presentToast(
              "your profile has been successfully changed"
            );
          } else if (this.language == "ar") {
            this.util.presentToast("تم تغيير ملف التعريف الخاص بك بنجاح");
          } else {
            this.util.presentToast("profilul dvs. a fost modificat cu succes");
          }
          this.navCtrl.navigateRoot("tabs/profile");
          this.util.dismissLoader();
          this.ionViewWillEnter();
          this.api.newLogin.next(true);
          this.api.isNewLogin().subscribe((d) => {
            console.log("event recived!");
            setTimeout(() => {
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
        }
      },
      (error) => {
        console.log("error", error);
        this.util.dismissLoader();
      }
    );
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack("tabs/profile");
    });
  }

  removeAddress() {
    this.util.startLoad();
    this.api
      .getDataWithToken("profile/address/remove/" + this.addressId)
      .subscribe(
        (success: any) => {
          if (success.success) {
            if (this.language == "en") {
              this.util.presentToast("address removed successsfully");
            } else if (this.language == "ar") {
              this.util.presentToast("تمت إزالة العنوان بنجاح");
            } else {
              this.util.presentToast("adresa eliminată cu succes");
            }
            this.util.dismissLoader();
            this.address.forEach((element) => {
              console.log("element of address", element);
              if (element.address_id == this.addressId) {
                this.address.shift(element);
              }
            });
          }
        },
        (error) => {
          console.log("error", error);
          this.util.dismissLoader();
        }
      );
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: 300,
      targetWidth: 300,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.img = "data:image/jpeg;base64," + imageData;
        this.imageUri = imageData;
        console.log("img", this.img);
        this.base64Image = this.sanitize.bypassSecurityTrustResourceUrl(
          this.img
        );
        this.image = this.imageUri;
        this.image = this.img;
        console.log("this.image", this.image);
        console.log("imagedata ", this.base64Image);
      },
      (err) => {}
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  croppedImagepath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  nearBy() {
    this.navCtrl.navigateForward("nearby");
  }

  back() {
    this.navCtrl.navigateBack("tabs/profile");
  }
}

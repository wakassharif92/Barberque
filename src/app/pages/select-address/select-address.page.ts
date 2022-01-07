import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UtilserviceService } from 'src/app/services/utilservice.service';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
})
export class SelectAddressPage implements OnInit {

  addressDiv: any = [];
  selectAddresss: any;
  isFrom: string;
  constructor(
    private modal: ModalController,
    private api: ApiService,
    private util: UtilserviceService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.util.startLoad();
    this.isFrom = localStorage.getItem('isFrom');
    this.api.getDataWithToken("profile").subscribe(
      (success: any) => {
        if (success.success) {
          this.addressDiv = success.data.address;
          this.util.dismissLoader();
        }
      },
      (err) => {}
    );
  }


  close() {
    this.modal.dismiss();
  }

  selectAddress(item) {
    console.log(item);
    localStorage.setItem("SelectAddress", item.address_id);
    this.modal.dismiss(item);
  }

  isDelete: boolean = true;

  deleteAddress(id) {
    this.util.startLoad();
    this.api.getDataWithToken("remove_address/" + id).subscribe(
      (success: any) => {
        if (success.success == true) {
          this.isDelete = false;

          this.util.presentToast("Address Deleted Successfully");
          this.ionViewWillEnter();
          this.util.dismissLoader();
          this.isDelete = true;
        } else {
          this.util.presentToast("Address is in Use");
          this.util.dismissLoader();
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.util.presentToast("Something Went Wrong");
      }
    );
  }

  addAddress(){
    this.modal.dismiss();
    this.util.nav.navigateForward("add-address");
  }

}

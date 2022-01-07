import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
 
@Component({
  selector: 'app-savelocation',
  templateUrl: './savelocation.page.html',
  styleUrls: ['./savelocation.page.scss'],
})
export class SavelocationPage implements OnInit {
  @Input() item;
  constructor(
    private modal:ModalController,
    private navCtrl:NavController,
    private util:UtilserviceService,
    private router:Router,
    private api:ApiService
  ) { 
    console.log(this.item);
  }

  close(item){
  this.api.addressData = item;
  localStorage.setItem('dataofaddress',this.api.addressData.address)
    this.modal.dismiss(item);
    
  }
  closeOnly(){
    this.modal.dismiss();
  }
  ngOnInit() {
    this.util.startLoad();
    console.log('this.item in savelocation page modal',this.item)
    this.util.dismissLoader();
  }

}

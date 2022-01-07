import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, NavController } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
declare var google: any;
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})

export class AddAddressPage implements OnInit {
  cityErr: any;
  countryErr: any;
  stateErr: any;
  streetErrr: any;
  constructor(
    private geoLocation: Geolocation,
    private platform: Platform,
    private util: UtilserviceService,
    private api: ApiService,
    private navCtrl: NavController,
  ) { 
    this.backbutton();
  }
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address_type: any;
  state: string;
  street: string;
  city: string;
  country: string;
  lat: number = 3.202778;
  lng: number = 73.220680;
  address: string;
  latitude: number;
  longitude: number;
  latt: any;
  long: any;
  markers: any;
  latttt:number;
  longgg:number;

  language:any;
  ngOnInit() {
   /*  this.util.startLoad(); */
    let latlng = { lat: this.lat, lng: this.lng };
    this.initPage();
  }
  ionViewWillEnter() {
    this.platform.ready().then(() => {
      this.initPage();
    })
    this.language = localStorage.getItem('lan');
  }

  initPage() {
    setTimeout(() => {
      this.geoLocation.getCurrentPosition().then(result => {
        this.loadMap(result.coords.latitude, result.coords.longitude);
        this.latt = result.coords.latitude;
        this.long = result.coords.longitude;
      })
      /* this.util.dismissLoader(); */
    }, 500);
  }

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
    let mapOption = {
      center: latLng,
      zoom: 14,
      mapTypeId: 'roadmap',
      disableDefaultUI: true
    }
    let element = document.getElementById('map');
    this.map = new google.maps.Map(element, mapOption);
    let marker = new google.maps.Marker(
      {
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
    let content = `
          <div id="myId" class="item item-thumbnail-left item-text-wrap">
            <ion-item>
              <ion-row>
                <h6> `+ marker.title + `</h6>
                <h6> `+ marker.position + `</h6>
              </ion-row>
            </ion-item>
          </div>
        `
    this.addInfoWindow(marker, content);
    marker.setMap(this.map);
  }

  closeModal() {
    this.util.startLoad();
    this.navCtrl.back();
    /* this.util.dismissLoader(); */
  }

  backbutton(){
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateBack('tabs/profile/edit');
    })
  }

  addInfoWindow(marker, content) {
    {
      let infoWindow = new google.maps.InfoWindow(
        {
          content: content
        });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
      google.maps.event.addListener(marker, 'dragend', function () {
        this.markerlatlong = marker.getPosition();
        this.latttt = marker.getPosition().lat();
        this.longgg = marker.getPosition().lng();
      });
    }
  }
  saveAddress() {
    this.util.startLoad();
    let data = {
      country: this.country,
      street: this.street,
      city: this.city,
      state: this.state,
      let: this.latt,
      long: this.long,
    }
    this.api.postDataWithToken('profile/address/add',data).subscribe((success: any) => {
      if (success.success) {
        this.navCtrl.navigateForward('tabs/home');
        this.util.dismissLoader();
        if(this.language =='en'){
          this.util.presentToast('address added successfullly');
        }else{
          this.util.presentToast('تمت إضافة العنوان بنجاح')
        }
      }
    }, error => {
      this.util.dismissLoader();
      this.cityErr = error.error.errors.city[0];
      this.countryErr = error.error.errors.country[0];
      this.stateErr = error.error.errors.state[0];
      this.streetErrr = error.error.errors.street[0];
    })
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmlocation',
  templateUrl: './confirmlocation.page.html',
  styleUrls: ['./confirmlocation.page.scss'],
})
export class ConfirmlocationPage implements OnInit {
  map: any; 
  country: any;
  lat: number;
  lng: number;
  address: string;
  latitude: any;
  longitude: any;
  latt: any;
  long: any;
  markers: any;
  map1: number;
  map2: number;
  data: any;
  id: any;
  public Centerlat:any;
  public Centerlng:any;
  origin: any = {};
  destination: any = {};
  public renderOptions = {
    suppressMarkers: true,
    draggable: false
  };
  public markerOptions = {
    origin: {
      icon: "../../../assets/icon/location1.svg"
    },
    destination: {
      icon: "../../../assets/icon/locaiton2.svg"
    },
    draggable: true
  };
  singlesalon: any;
  salon_id: any;
  salonLong: number;
  salonLat: number;
  currentdata: string;
  res: string;
  distance: any;
  salon: { salonDetail: any; };
  @ViewChild('map', { static: false }) mapElement: ElementRef
  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private geolocation: Geolocation,
    private router: Router,
    private route: ActivatedRoute,
    private platform:Platform
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.longitude = this.router.getCurrentNavigation().extras.state.longitude;
        this.latitude = this.router.getCurrentNavigation().extras.state.latitude;
        this.map1 = parseFloat(this.latitude);
        this.map2 = parseFloat(this.longitude);
        const date = Date.now();
        const options:any = { weekday: "long" };
        this.currentdata = new Intl.DateTimeFormat("en-US", options).format(date);
        this.res = this.currentdata.toLowerCase();
        var current_date = new Date();
        var weekday_value = current_date.getDay();
      }
    });
    this.backButtonEvent();
  }
  ngOnInit() {} 
  ionViewWillEnter(){
    this.util.startLoad();
    this.singlesalon = this.api.salonDetail;
    this.distance = this.api.distance;
    this.salonLat = parseFloat(this.api.salonDetail.latitude);
    this.salonLong = parseFloat(this.api.salonDetail.longitude);
    this.lat = this.api.salonDetail.longitude;
    this.lng = this.api.salonDetail.longitude;
    this.getGeolocation();
  }
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
      this.origin = { lat: this.lat, lng: this.long };
      this.destination = { lat: this.salonLat, lng: this.salonLong };
      this.Centerlat = resp.coords.latitude;
      this.Centerlng = resp.coords.longitude;
      this.util.dismissLoader();
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  back() {
    this.navCtrl.back();
  }

  backButtonEvent(){
    this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateBack('tabs/home/salon-profile');
    })
  }
 

  public styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    }
  ];


}

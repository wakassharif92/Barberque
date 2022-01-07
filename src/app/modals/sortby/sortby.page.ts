import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { modalController } from "@ionic/core";
import { ApiService } from 'src/app/services/api.service';
import { element } from 'protractor';
@Component({
  selector: 'app-sortby',
  templateUrl: './sortby.page.html',
  styleUrls: ['./sortby.page.scss'],
})
export class SortbyPage implements OnInit {
  hair: any;
  make: any;
  shaving: any;
  mackup: any;
  styling: any;
  salon: any;
  all: any;
  custValue: any;
  catagories: any = [];
  selectBtn: any;
  services: any;
  isChecked: boolean;
  id: any;
  constructor(
    private modal: ModalController,
    private ntrl: NavController,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getData('categories').subscribe((success: any) => {
      if (success.success) {
        this.catagories = success.data;
      }
    }, error => { })
  }
  btnChanged(c) {
    this.selectBtn = c;   
    this.catagories.forEach(element => {
      if (c.id == element.cat_id) {
        this.id = element.cat_id;
      }
    });
  }
  selected = 'Makeup';
  gender: any = [
    {
      label: 'Male',
      checked: true
    },
    {
      label: 'Female',
      checked: false
    },
    {
      label: 'Both',
      checked: false
    }
  ]
  filter: any = [
    {
      label: 'Price : Low to High',
      checked: true,
    },
    {
      label: 'Price : High to Low',
      checked: false,
    }
  ]
  selectCheck = 'Price : Low to High';
  setAddressType(type) {
    this.filter.forEach(element => {
      element.checked = false;
    });
    type.checked = true;
    this.selectCheck = type.label;
  }
  close() {
    let data = {
      gender: this.select,
      category: this.selectBtn,
      shortBy: this.selectCheck
    }    
    modalController.dismiss(data);
  }
  select:any; 
  changeGenderValue(e) { 
    this.gender.forEach(element => {
      if (element.label == e.detail.value) {
        element.checked = true;
        this.select = e.detail.value
        
        
      } else {
        element.checked = false;
       
      }
    });
  }
  selectRad(data) {
    this.custValue = data;
  }
}

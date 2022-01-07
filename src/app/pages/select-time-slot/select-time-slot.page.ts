import { Component, OnInit } from "@angular/core";
import { NavController, Platform, ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { UtilserviceService } from "src/app/services/utilservice.service";
import * as moment from "moment";
import { NavigationExtras } from "@angular/router";
import { LoginPage } from "../login/login.page";
import { SelectAddressPage } from "../select-address/select-address.page";
@Component({
  selector: "app-select-time-slot",
  templateUrl: "./select-time-slot.page.html",
  styleUrls: ["./select-time-slot.page.scss"],
})
export class SelectTimeSlotPage implements OnInit {
  calender: any = {
    month: "",
    year: "",
    date: [],
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
    currentDay: new Date().getDate(),
  };
  selected: any = "";
  isOpen: any = false;
  localStorageData: any = [];
  servicesId: any = [];
  timeSlot: any = [];
  language: any;
  serviceList: any = [
    { name: "Professional Hair Wash", price: 25, duration: 30 },
    { name: "Hair Spa Wash", price: 35, duration: 45 },
    { name: "Child Hair Cut", price: 25, duration: 45 },
  ];
  slice: any = {
    from: 0,
    to: 0,
  };
  err: any = {};
  salonId: string;
  selectedDate: any;
  time = [];
  selectBtn: any;
  empId: any;
  isItemChecked: boolean;
  bookingCart: any;
  total: any;
  success: any;
  errm: string;
  empBook: string;
  false: boolean;
  errr: any;
  falseee: any;
  localAdd: any = "";
  constructor(
    private navCtrl: NavController,
    private api: ApiService,
    private util: UtilserviceService,
    private platform: Platform,
    private modalCtrl: ModalController
  ) {
    this.salonId = localStorage.getItem("Salon-id");
    this.total = this.api.total;
    this.localStorageData = localStorage.getItem("booking-detail")
      ? JSON.parse(localStorage.getItem("booking-detail"))
      : [];
    this.localStorageData.forEach((element) => {
      this.servicesId.push(element.service_id);
    });
    this.backButtonEvent();
  }

  data: any = [];
  ionViewWillEnter() {}

  async ngOnInit() {
    this.language = localStorage.getItem("lan");
    let token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "";
    if (token == "") {
      localStorage.setItem("previous-request", "true");
      localStorage.setItem(
        "previous-request-page",
        "/tabs/home/select-time-slot"
      );
      let model = await this.modalCtrl.create({
        component: LoginPage,
      });
      model.present();
    }
    let hasPre = localStorage.getItem("previous-request")
      ? localStorage.getItem("previous-request")
      : false;
    let prePage = localStorage.getItem("previous-request-page")
      ? localStorage.getItem("previous-request-page")
      : "";
    if (hasPre == "true" && prePage == "select-time-slot") {
      localStorage.setItem("previous-request", "true");
    }
    var today: any = new Date();
    this.calender.month = today.getMonth() + 1;
    // console.log('length ', this.calender.month)
    this.calender.year = today.getFullYear();
    this.slice.from = this.calender.currentDay - 1;
    this.slice.to = this.calender.currentDay + 6;

    this.selected =
      this.calender.year +
      "-" +
      this.calender.month +
      "-" +
      ("0" + today.getDate()).slice(-2);
    // console.log('this.selected',this.selected);
    this.action(0);
    this.request();
    /* this.util.startLoad(); */
  }

  verifyEvent(id) {
    this.empId = id;
    let selected = 0;
    this.data.map((item) => {
      if (item.emp_id == id) {
        item.isItemChecked = !item.isItemChecked;
        if (item.isItemChecked == false) {
          this.empId = null;
        }
      } else {
        item.isItemChecked = false;
      }
      if (item.isItemChecked == true) {
        selected++;
        if (item.emp_id == id) {
          // console.log(id);
          // console.log('emp Id Selected ',this.empId)
        }
      } else {
      }
    });
  }

  updateCheckedOptions(event) {
    if (event.checked) {
      this.checked.push(this.bookingCart);
    }
  }

  back() {
    this.navCtrl.back();
    localStorage.removeItem("empid");
    localStorage.removeItem("SelectAddress");
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack("tabs/home/salonprofile");
    });
  }

  checked: any = [];

  bookNow() {
    let istime = false;
    this.api.time.date = this.selected;
    this.timeSlot.forEach((element) => {
      if (element.issel) {
        this.api.time.timeslot = element.time;
        istime = true;
      }
    });
    // console.log(this.api.time.timeslot);

    if (istime) {
      this.navCtrl.navigateForward("/select-service");
    } else {
      if (this.language == "en") {
        this.util.presentToast("Please Select Timeslot");
      } else if (this.language == "ar") {
        this.util.presentToast("يرجى تحديد الفترة الزمنية");
      } else {
        this.util.presentToast("Vă rugăm să selectați intervalul de timp");
      }
    }
  }

  async nextPage() {
    this.localAdd = localStorage.getItem("SelectAddress");
    window.localStorage.getItem("SelectAddress")
      ? JSON.parse(window.localStorage.getItem("SelectAddress"))
      : [];
    // console.log(this.localAdd);
    if (this.api.booking_at == "Home" && this.localAdd === null) {
      const modal = await this.modalCtrl.create({
        component: SelectAddressPage,
      });
      // modal.onDidDismiss().then((data: any) => {
      //   this.localAdd = data.address_id
      // })
      return await modal.present();
    } else {
      let token = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";
      if (token != "") {
        if (this.selectBtn != null && this.empId != null) {
          let navigationExtra: NavigationExtras = {
            state: {
              empId: this.empId,
              date: this.selected,
              salonId: this.salonId,
              service: this.servicesId,
              start_time: this.selectBtn,
              total: this.total,
            },
          };
          let data = {
            empId: this.empId,
            date: this.selected,
            salonId: this.salonId,
            service: this.servicesId,
            start_time: this.selectBtn,
            total: this.total,
          };
          localStorage.setItem("data of salon", JSON.stringify(data));
          this.navCtrl.navigateForward(
            ["tabs/home/makepayment"], 
            navigationExtra
          );
          localStorage.setItem("empid", this.empId);
          localStorage.setItem("date", this.selected);
          // console.log('this.start_tie',this.selectBtn);
          localStorage.setItem("time", this.selectBtn);
          localStorage.setItem("total", this.total);
        } else if (this.selectBtn == null) {
          this.errm = "Choose The Time";
          if (this.language == "en") {
            this.util.presentToast("Choose The Time");
          } else if (this.language == "ar") {
            this.util.presentToast("اختر الوقت");
          } else {
            this.util.presentToast("Alegeți timpul");
          }
        } else if (this.empId == null) {
          this.empBook = "Choose the Employee";
          if (this.language == "en") {
            this.util.presentToast(this.empBook);
          } else if (this.language == "ar") {
            this.util.presentToast("اختر الموظف");
          } else {
            this.util.presentToast("Alegeți angajatul");
          }
        }
      } else {
        localStorage.setItem("previous-request", "true");
        localStorage.setItem(
          "previous-request-page",
          "/tabs/home/select-time-slot"
        );
        let model = await this.modalCtrl.create({
          component: LoginPage,
        });
        model.present();
      }
    }
  }

  action(check) {
    // console.log("check: ", check);
    if (check != 0) {
      if (check == 2) {
        this.slice.from = this.slice.from + 7;
        this.slice.to = this.slice.to + 7;
        if (this.slice.from >= 28) {
          this.slice.from = 0;
          this.slice.to = 7;
          if (this.calender.month == 12) {
            this.calender.month = 1;
            this.calender.year += 1;
            // console.log('if condition run');
          } else {
            this.calender.month += 1;
            // console.log('this.else condition run');
          }
        }
      }
      if (check == 1) {
        this.slice.from = this.slice.from - 7;
        this.slice.to = this.slice.to - 7;
        if (this.slice.from <= 1) {
          if (this.calender.month == 1) {
            this.calender.month = 12;
            this.calender.year -= 1;
          } else {
            this.calender.month -= 1;
          }
          let days = moment(
            this.calender.year + "-" + this.calender.month,
            "YYYY-MM"
          ).daysInMonth();
          //  console.log("days", days);
          this.slice.from = days - 7;
          this.slice.to = days;
          // console.log("this.slice: ", this.slice);
        }
      }
    }

    this.calender.date = [];
    let days: any;
    days = moment(
      this.calender.year + "-" + this.calender.month,
      "YYYY-MM"
    ).daysInMonth();
    let state = false;
    for (let i: any = 0; i < days; i++) {
      let day =
        this.calender.year +
        "-" +
        this.calender.month +
        "-" +
        ("0" + parseInt(i + 1)).slice(-2);
      if (
        this.calender.currentYear == this.calender.year &&
        this.calender.currentMonth == this.calender.month
      ) {
        // console.log(this.calender.currentDay);
        // console.log(this.slice);
        if (("0" + parseInt(i + 1)).slice(-2) == this.calender.currentDay) {
          state = true;
          // console.log("state: ", state);
        }
        // console.log("state: ", state);
        if (state == false) {
          this.calender.date.push({ date: day, selected: false });
        } else {
          this.calender.date.push({ date: day, selected: true });
        }
      } else {
        if (this.calender.year == this.calender.currentYear) {
          if (this.calender.month >= this.calender.currentMonth) {
            this.calender.date.push({ date: day, selected: true });
          } else {
            this.calender.date.push({ date: day, selected: false });
          }
        } else {
          if (this.calender.year > this.calender.currentYear) {
            this.calender.date.push({ date: day, selected: true });
          }
        }
      }
    }
    // console.log("calender", this.calender);
  }

  request() {
    this.time = [];
    this.data = [];
    this.selectBtn = null;
    let rdata: any = {};
    rdata.date = moment(this.selected).format("YYYY-MM-DD");
    let data = {
      salon_id: this.salonId,
      date: this.selected,
    };
    this.util.startLoad();
    this.api.postDataWithToken("timeslot", data).subscribe(
      (res: any) => {
        // console.log('res',res.success);

        this.success = res.success;

        if (res.success) {
          this.util.dismissLoader();
          this.time = res.data;
        }
        if (res.success == false) {
          this.util.dismissLoader();
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

  activeSlot(i) {
    this.data = [];
    // console.log(i);
    this.selectBtn = i;
    this.util.startLoad();
    let data = {
      start_time: this.selectBtn,
      service: this.servicesId,
      date: this.selected,
      salon_id: this.salonId,
      booking_at: this.api.booking_at,
    };

    this.api.postDataWithToken("selectemp", data).subscribe(
      (success: any) => {
        // console.log('success',success.msg);
        this.falseee = success.success;
        // console.log('success false ',this.false)
        // console.log('false',this.false)
        if (success.success == true) {
          this.data = success.data;
          // console.log('data',this.data)
          this.util.dismissLoader();
        } else {
          this.util.dismissLoader();
        }
        /* else if(success.success == false){
        this.util.presentToast(success.msg);
      } */
      },
      (error) => {
        this.util.dismissLoader();
        // console.log(error.success.msg);
      }
    );
  }
}

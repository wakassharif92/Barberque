import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SinglecouponpagePage } from './singlecouponpage.page';

describe('SinglecouponpagePage', () => {
  let component: SinglecouponpagePage;
  let fixture: ComponentFixture<SinglecouponpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglecouponpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglecouponpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

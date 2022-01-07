import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopServicesPage } from './top-services.page';

describe('TopServicesPage', () => {
  let component: TopServicesPage;
  let fixture: ComponentFixture<TopServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

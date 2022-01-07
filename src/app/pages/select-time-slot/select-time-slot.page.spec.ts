import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectTimeSlotPage } from './select-time-slot.page';

describe('SelectTimeSlotPage', () => {
  let component: SelectTimeSlotPage;
  let fixture: ComponentFixture<SelectTimeSlotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTimeSlotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTimeSlotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

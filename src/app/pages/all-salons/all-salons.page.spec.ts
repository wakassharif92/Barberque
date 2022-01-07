import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllSalonsPage } from './all-salons.page';

describe('AllSalonsPage', () => {
  let component: AllSalonsPage;
  let fixture: ComponentFixture<AllSalonsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSalonsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllSalonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

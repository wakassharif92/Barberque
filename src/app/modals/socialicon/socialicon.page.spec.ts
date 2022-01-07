import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocialiconPage } from './socialicon.page';

describe('SocialiconPage', () => {
  let component: SocialiconPage;
  let fixture: ComponentFixture<SocialiconPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialiconPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialiconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

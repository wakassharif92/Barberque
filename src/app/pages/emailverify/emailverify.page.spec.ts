import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailverifyPage } from './emailverify.page';

describe('EmailverifyPage', () => {
  let component: EmailverifyPage;
  let fixture: ComponentFixture<EmailverifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailverifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

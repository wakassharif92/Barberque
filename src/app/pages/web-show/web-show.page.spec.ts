import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebShowPage } from './web-show.page';

describe('WebShowPage', () => {
  let component: WebShowPage;
  let fixture: ComponentFixture<WebShowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

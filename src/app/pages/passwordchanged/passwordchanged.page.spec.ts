import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasswordchangedPage } from './passwordchanged.page';

describe('PasswordchangedPage', () => {
  let component: PasswordchangedPage;
  let fixture: ComponentFixture<PasswordchangedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordchangedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordchangedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

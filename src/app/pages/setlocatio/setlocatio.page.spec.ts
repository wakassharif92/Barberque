import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetlocatioPage } from './setlocatio.page';

describe('SetlocatioPage', () => {
  let component: SetlocatioPage;
  let fixture: ComponentFixture<SetlocatioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetlocatioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetlocatioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

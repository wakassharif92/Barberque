import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortbyPage } from './sortby.page';

describe('SortbyPage', () => {
  let component: SortbyPage;
  let fixture: ComponentFixture<SortbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortbyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

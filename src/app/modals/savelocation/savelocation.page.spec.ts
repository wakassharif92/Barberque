import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavelocationPage } from './savelocation.page';

describe('SavelocationPage', () => {
  let component: SavelocationPage;
  let fixture: ComponentFixture<SavelocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavelocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavelocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

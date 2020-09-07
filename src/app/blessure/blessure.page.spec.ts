import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlessurePage } from './blessure.page';

describe('BlessurePage', () => {
  let component: BlessurePage;
  let fixture: ComponentFixture<BlessurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlessurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlessurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

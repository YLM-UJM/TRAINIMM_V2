import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HebdomadairePage } from './hebdomadaire.page';

describe('HebdomadairePage', () => {
  let component: HebdomadairePage;
  let fixture: ComponentFixture<HebdomadairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebdomadairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HebdomadairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SommeilPage } from './sommeil.page';

describe('SommeilPage', () => {
  let component: SommeilPage;
  let fixture: ComponentFixture<SommeilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SommeilPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SommeilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

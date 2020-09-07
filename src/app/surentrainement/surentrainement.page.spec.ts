import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurentrainementPage } from './surentrainement.page';

describe('SurentrainementPage', () => {
  let component: SurentrainementPage;
  let fixture: ComponentFixture<SurentrainementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurentrainementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurentrainementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

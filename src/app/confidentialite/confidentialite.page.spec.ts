import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfidentialitePage } from './confidentialite.page';

describe('ConfidentialitePage', () => {
  let component: ConfidentialitePage;
  let fixture: ComponentFixture<ConfidentialitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfidentialitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfidentialitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivefeedPage } from './livefeed.page';

describe('LivefeedPage', () => {
  let component: LivefeedPage;
  let fixture: ComponentFixture<LivefeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivefeedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivefeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

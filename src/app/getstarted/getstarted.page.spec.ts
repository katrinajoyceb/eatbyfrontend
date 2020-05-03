import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetstartedPage } from './getstarted.page';

describe('GetstartedPage', () => {
  let component: GetstartedPage;
  let fixture: ComponentFixture<GetstartedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetstartedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetstartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

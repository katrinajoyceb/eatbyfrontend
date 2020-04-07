import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EatbylogoComponent } from './eatbylogo.component';

describe('EatbylogoComponent', () => {
  let component: EatbylogoComponent;
  let fixture: ComponentFixture<EatbylogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatbylogoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EatbylogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

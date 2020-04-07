import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManualformComponent } from './manualform.component';

describe('ManualformComponent', () => {
  let component: ManualformComponent;
  let fixture: ComponentFixture<ManualformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualformComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManualformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

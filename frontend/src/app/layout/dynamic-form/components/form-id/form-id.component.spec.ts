import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormIdComponent } from './form-id.component';

describe('FormIdComponent', () => {
  let component: FormIdComponent;
  let fixture: ComponentFixture<FormIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormIdComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

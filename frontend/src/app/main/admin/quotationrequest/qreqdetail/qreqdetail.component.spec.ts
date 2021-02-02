import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QreqdetailComponent } from './qreqdetail.component';


describe('QrdetailComponent', () => {
  let component: QreqdetailComponent;
  let fixture: ComponentFixture<QreqdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QreqdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QreqdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

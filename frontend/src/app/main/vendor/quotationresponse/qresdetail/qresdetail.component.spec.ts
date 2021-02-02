import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QresdetailComponent } from './qresdetail.component';

describe('QresdetailComponent', () => {
  let component: QresdetailComponent;
  let fixture: ComponentFixture<QresdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QresdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QresdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

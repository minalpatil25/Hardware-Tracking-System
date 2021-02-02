import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QreslistComponent } from './qreslist.component';

describe('QreslistComponent', () => {
  let component: QreslistComponent;
  let fixture: ComponentFixture<QreslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QreslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QreslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

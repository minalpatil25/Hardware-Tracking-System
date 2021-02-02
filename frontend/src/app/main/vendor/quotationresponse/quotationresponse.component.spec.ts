import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationresponseComponent } from './quotationresponse.component';

describe('QuotationresponseComponent', () => {
  let component: QuotationresponseComponent;
  let fixture: ComponentFixture<QuotationresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationresponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

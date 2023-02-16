import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSaleCardComponent } from './brand-sale-card.component';

describe('BrandsaleCardComponent', () => {
  let component: BrandSaleCardComponent;
  let fixture: ComponentFixture<BrandSaleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandSaleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSaleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

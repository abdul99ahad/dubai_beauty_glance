import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProductListingComponent } from './brand-products-listing.component';

describe('BrandProductListingComponent', () => {
  let component: BrandProductListingComponent;
  let fixture: ComponentFixture<BrandProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandProductListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

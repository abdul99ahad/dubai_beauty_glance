import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsListingComponent } from './brand-listing.component';

describe('BrandsListingComponent', () => {
  let component: BrandsListingComponent;
  let fixture: ComponentFixture<BrandsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandsListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

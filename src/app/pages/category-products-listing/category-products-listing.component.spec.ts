import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryProductsListingComponent } from './category-products-listing.component';

describe('CategoryProductsListingComponent', () => {
  let component: CategoryProductsListingComponent;
  let fixture: ComponentFixture<CategoryProductsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryProductsListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryProductsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

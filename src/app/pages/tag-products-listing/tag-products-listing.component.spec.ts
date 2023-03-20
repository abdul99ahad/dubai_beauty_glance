import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagProductsListingComponent } from './tag-products-listing.component';

describe('TagProductsListingComponent', () => {
  let component: TagProductsListingComponent;
  let fixture: ComponentFixture<TagProductsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagProductsListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagProductsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

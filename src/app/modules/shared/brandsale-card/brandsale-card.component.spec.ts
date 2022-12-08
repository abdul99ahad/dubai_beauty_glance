import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsaleCardComponent } from './brandsale-card.component';

describe('BrandsaleCardComponent', () => {
  let component: BrandsaleCardComponent;
  let fixture: ComponentFixture<BrandsaleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandsaleCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsaleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

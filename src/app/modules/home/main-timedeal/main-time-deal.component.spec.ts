import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTimeDealComponent } from './main-time-deal.component';

describe('MainTimedealComponent', () => {
  let component: MainTimeDealComponent;
  let fixture: ComponentFixture<MainTimeDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainTimeDealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTimeDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTimedealComponent } from './main-timedeal.component';

describe('MainTimedealComponent', () => {
  let component: MainTimedealComponent;
  let fixture: ComponentFixture<MainTimedealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTimedealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTimedealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

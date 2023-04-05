import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterSwitchComponent } from './newsletter-switch.component';

describe('NewsletterSwitchComponent', () => {
  let component: NewsletterSwitchComponent;
  let fixture: ComponentFixture<NewsletterSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

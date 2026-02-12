import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mindset } from './mindset';

describe('Mindset', () => {
  let component: Mindset;
  let fixture: ComponentFixture<Mindset>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mindset]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mindset);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

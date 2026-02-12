import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Growth } from './growth';

describe('Growth', () => {
  let component: Growth;
  let fixture: ComponentFixture<Growth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Growth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Growth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

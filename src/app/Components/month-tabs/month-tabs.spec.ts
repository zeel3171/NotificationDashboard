import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthTabs } from './month-tabs';

describe('MonthTabs', () => {
  let component: MonthTabs;
  let fixture: ComponentFixture<MonthTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

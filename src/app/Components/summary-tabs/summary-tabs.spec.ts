import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTabs } from './summary-tabs';

describe('SummaryTabs', () => {
  let component: SummaryTabs;
  let fixture: ComponentFixture<SummaryTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

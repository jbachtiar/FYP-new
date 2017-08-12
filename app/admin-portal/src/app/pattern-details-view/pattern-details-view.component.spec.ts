import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternDetailsViewComponent } from './pattern-details-view.component';

describe('PatternDetailsViewComponent', () => {
  let component: PatternDetailsViewComponent;
  let fixture: ComponentFixture<PatternDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

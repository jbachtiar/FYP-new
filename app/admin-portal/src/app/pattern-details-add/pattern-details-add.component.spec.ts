import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternDetailsAddComponent } from './pattern-details-add.component';

describe('PatternDetailsAddComponent', () => {
  let component: PatternDetailsAddComponent;
  let fixture: ComponentFixture<PatternDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

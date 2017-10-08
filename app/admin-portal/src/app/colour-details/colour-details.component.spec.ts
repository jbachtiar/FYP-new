import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourDetailsComponent } from './colour-details.component';

describe('ColourDetailsComponent', () => {
  let component: ColourDetailsComponent;
  let fixture: ComponentFixture<ColourDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

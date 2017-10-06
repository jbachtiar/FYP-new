import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourDetailsEditComponent } from './colour-details-edit.component';

describe('ColourDetailsEditComponent', () => {
  let component: ColourDetailsEditComponent;
  let fixture: ComponentFixture<ColourDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

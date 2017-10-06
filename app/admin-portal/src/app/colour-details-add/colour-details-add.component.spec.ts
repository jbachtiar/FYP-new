import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourDetailsAddComponent } from './colour-details-add.component';

describe('ColourDetailsAddComponent', () => {
  let component: ColourDetailsAddComponent;
  let fixture: ComponentFixture<ColourDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

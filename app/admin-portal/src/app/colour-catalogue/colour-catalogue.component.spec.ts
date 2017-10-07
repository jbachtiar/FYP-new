import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourCatalogueComponent } from './colour-catalogue.component';

describe('ColourCatalogueComponent', () => {
  let component: ColourCatalogueComponent;
  let fixture: ComponentFixture<ColourCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

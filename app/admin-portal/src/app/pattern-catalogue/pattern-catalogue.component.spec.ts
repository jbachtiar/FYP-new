import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternCatalogueComponent } from './pattern-catalogue.component';

describe('PatternCatalogueComponent', () => {
  let component: PatternCatalogueComponent;
  let fixture: ComponentFixture<PatternCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeCatalogueComponent } from './size-catalogue.component';

describe('SizeCatalogueComponent', () => {
  let component: SizeCatalogueComponent;
  let fixture: ComponentFixture<SizeCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

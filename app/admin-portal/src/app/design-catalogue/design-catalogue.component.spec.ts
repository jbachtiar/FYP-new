import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCatalogueComponent } from './design-catalogue.component';

describe('DesignCatalogueComponent', () => {
  let component: DesignCatalogueComponent;
  let fixture: ComponentFixture<DesignCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

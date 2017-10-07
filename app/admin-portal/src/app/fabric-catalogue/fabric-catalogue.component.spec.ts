import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricCatalogueComponent } from './fabric-catalogue.component';

describe('FabricCatalogueComponent', () => {
  let component: FabricCatalogueComponent;
  let fixture: ComponentFixture<FabricCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

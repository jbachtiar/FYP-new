import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCatalogueComponent } from './collection-catalogue.component';

describe('CollectionCatalogueComponent', () => {
  let component: CollectionCatalogueComponent;
  let fixture: ComponentFixture<CollectionCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

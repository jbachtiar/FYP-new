import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailsAddComponent } from './collection-details-add.component';

describe('CollectionDetailsAddComponent', () => {
  let component: CollectionDetailsAddComponent;
  let fixture: ComponentFixture<CollectionDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

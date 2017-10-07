import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailsEditComponent } from './collection-details-edit.component';

describe('CollectionDetailsEditComponent', () => {
  let component: CollectionDetailsEditComponent;
  let fixture: ComponentFixture<CollectionDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

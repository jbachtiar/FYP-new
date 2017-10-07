import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricDetailsEditComponent } from './fabric-details-edit.component';

describe('FabricDetailsEditComponent', () => {
  let component: FabricDetailsEditComponent;
  let fixture: ComponentFixture<FabricDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

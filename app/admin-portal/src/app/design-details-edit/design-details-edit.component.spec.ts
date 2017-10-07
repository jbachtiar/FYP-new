import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDetailsEditComponent } from './design-details-edit.component';

describe('DesignDetailsEditComponent', () => {
  let component: DesignDetailsEditComponent;
  let fixture: ComponentFixture<DesignDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

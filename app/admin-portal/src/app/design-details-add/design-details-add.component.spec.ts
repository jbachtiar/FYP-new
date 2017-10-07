import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDetailsAddComponent } from './design-details-add.component';

describe('DesignDetailsAddComponent', () => {
  let component: DesignDetailsAddComponent;
  let fixture: ComponentFixture<DesignDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricDetailsAddComponent } from './fabric-details-add.component';

describe('FabricDetailsAddComponent', () => {
  let component: FabricDetailsAddComponent;
  let fixture: ComponentFixture<FabricDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

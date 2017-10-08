import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricDetailsComponent } from './fabric-details.component';

describe('FabricDetailsComponent', () => {
  let component: FabricDetailsComponent;
  let fixture: ComponentFixture<FabricDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

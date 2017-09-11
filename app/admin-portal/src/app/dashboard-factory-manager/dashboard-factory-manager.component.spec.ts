import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFactoryManagerComponent } from './dashboard-factory-manager.component';

describe('DashboardFactoryManagerComponent', () => {
  let component: DashboardFactoryManagerComponent;
  let fixture: ComponentFixture<DashboardFactoryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFactoryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFactoryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

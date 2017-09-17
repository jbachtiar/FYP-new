import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackOrderDetailComponent } from './track-order-detail.component';

describe('TrackOrderDetailComponent', () => {
  let component: TrackOrderDetailComponent;
  let fixture: ComponentFixture<TrackOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

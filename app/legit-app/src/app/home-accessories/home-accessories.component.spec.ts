import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccessoriesComponent } from './home-accessories.component';

describe('HomeAccessoriesComponent', () => {
  let component: HomeAccessoriesComponent;
  let fixture: ComponentFixture<HomeAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

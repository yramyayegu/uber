import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetrideComponent } from './getride.component';

describe('GetrideComponent', () => {
  let component: GetrideComponent;
  let fixture: ComponentFixture<GetrideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetrideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

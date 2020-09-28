import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDestinationComponent } from './flight-destination.component';

describe('FlightDestinationComponent', () => {
  let component: FlightDestinationComponent;
  let fixture: ComponentFixture<FlightDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

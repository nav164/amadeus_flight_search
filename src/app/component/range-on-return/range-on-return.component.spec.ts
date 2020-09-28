import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeOnReturnComponent } from './range-on-return.component';

describe('RangeOnReturnComponent', () => {
  let component: RangeOnReturnComponent;
  let fixture: ComponentFixture<RangeOnReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeOnReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeOnReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

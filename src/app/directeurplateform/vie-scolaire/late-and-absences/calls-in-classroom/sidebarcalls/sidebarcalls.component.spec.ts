import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarcallsComponent } from './sidebarcalls.component';

describe('SidebarcallsComponent', () => {
  let component: SidebarcallsComponent;
  let fixture: ComponentFixture<SidebarcallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarcallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarcallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebargroupementComponent } from './sidebargroupement.component';

describe('SidebargroupementComponent', () => {
  let component: SidebargroupementComponent;
  let fixture: ComponentFixture<SidebargroupementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebargroupementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebargroupementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

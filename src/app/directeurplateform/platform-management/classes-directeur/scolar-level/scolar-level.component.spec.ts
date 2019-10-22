import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolarLevelComponent } from './scolar-level.component';

describe('ScolarLevelComponent', () => {
  let component: ScolarLevelComponent;
  let fixture: ComponentFixture<ScolarLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScolarLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolarLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

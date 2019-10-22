import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolarClassesComponent } from './scolar-classes.component';

describe('ScolarClassesComponent', () => {
  let component: ScolarClassesComponent;
  let fixture: ComponentFixture<ScolarClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScolarClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScolarClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

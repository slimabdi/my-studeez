import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomepgeComponent } from './welcomepge.component';

describe('WelcomepgeComponent', () => {
  let component: WelcomepgeComponent;
  let fixture: ComponentFixture<WelcomepgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomepgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomepgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

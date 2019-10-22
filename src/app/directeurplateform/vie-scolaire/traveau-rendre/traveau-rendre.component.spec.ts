import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraveauRendreComponent } from './traveau-rendre.component';

describe('TraveauRendreComponent', () => {
  let component: TraveauRendreComponent;
  let fixture: ComponentFixture<TraveauRendreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraveauRendreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraveauRendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

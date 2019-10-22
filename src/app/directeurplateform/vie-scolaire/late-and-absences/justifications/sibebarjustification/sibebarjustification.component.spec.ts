import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SibebarjustificationComponent } from './sibebarjustification.component';

describe('SibebarjustificationComponent', () => {
  let component: SibebarjustificationComponent;
  let fixture: ComponentFixture<SibebarjustificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SibebarjustificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SibebarjustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpGalerieComponent } from './up-galerie.component';

describe('UpGalerieComponent', () => {
  let component: UpGalerieComponent;
  let fixture: ComponentFixture<UpGalerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpGalerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpGalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

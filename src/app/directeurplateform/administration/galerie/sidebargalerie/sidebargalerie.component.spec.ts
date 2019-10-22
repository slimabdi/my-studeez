import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebargalerieComponent } from './sidebargalerie.component';

describe('SidebargalerieComponent', () => {
  let component: SidebargalerieComponent;
  let fixture: ComponentFixture<SidebargalerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebargalerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebargalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

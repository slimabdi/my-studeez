import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetlisteComponent } from './carnetliste.component';

describe('CarnetlisteComponent', () => {
  let component: CarnetlisteComponent;
  let fixture: ComponentFixture<CarnetlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

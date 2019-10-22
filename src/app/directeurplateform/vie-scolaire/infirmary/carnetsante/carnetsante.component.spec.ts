import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetsanteComponent } from './carnetsante.component';

describe('CarnetsanteComponent', () => {
  let component: CarnetsanteComponent;
  let fixture: ComponentFixture<CarnetsanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarnetsanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarnetsanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

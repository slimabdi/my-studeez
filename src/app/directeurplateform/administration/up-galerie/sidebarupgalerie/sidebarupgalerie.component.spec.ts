import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarupgalerieComponent } from './sidebarupgalerie.component';

describe('SidebarupgalerieComponent', () => {
  let component: SidebarupgalerieComponent;
  let fixture: ComponentFixture<SidebarupgalerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarupgalerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarupgalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

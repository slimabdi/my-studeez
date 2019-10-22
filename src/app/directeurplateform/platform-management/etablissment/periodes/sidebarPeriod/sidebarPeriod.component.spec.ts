import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPeriodComponent } from './sidebarPeriod.component';

describe('SidebarlevelsComponent', () => {
  let component: SidebarPeriodComponent;
  let fixture: ComponentFixture<SidebarPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

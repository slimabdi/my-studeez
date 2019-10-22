import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarinfirmaryComponent } from './sidebarinfirmary.component';

describe('SidebarinfirmaryComponent', () => {
  let component: SidebarinfirmaryComponent;
  let fixture: ComponentFixture<SidebarinfirmaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarinfirmaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarinfirmaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

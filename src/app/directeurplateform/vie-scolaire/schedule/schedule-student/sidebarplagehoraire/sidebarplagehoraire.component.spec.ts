import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarplagehoraireComponent } from './sidebarplagehoraire.component';

describe('SidebarplagehoraireComponent', () => {
  let component: SidebarplagehoraireComponent;
  let fixture: ComponentFixture<SidebarplagehoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarplagehoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarplagehoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

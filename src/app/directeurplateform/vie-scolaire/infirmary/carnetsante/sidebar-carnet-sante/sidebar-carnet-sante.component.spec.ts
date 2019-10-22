import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCarnetSanteComponent } from './sidebar-carnet-sante.component';

describe('SidebarCarnetSanteComponent', () => {
  let component: SidebarCarnetSanteComponent;
  let fixture: ComponentFixture<SidebarCarnetSanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCarnetSanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCarnetSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSubjectComponent} from './sidebarSubject.component';

describe('SidebarSubjectComponent', () => {
  let component: SidebarSubjectComponent;
  let fixture: ComponentFixture<SidebarSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

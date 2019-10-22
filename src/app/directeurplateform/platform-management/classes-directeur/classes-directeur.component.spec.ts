import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDirecteurComponent } from './classes-directeur.component';

describe('ClassesDirecteurComponent', () => {
  let component: ClassesDirecteurComponent;
  let fixture: ComponentFixture<ClassesDirecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesDirecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

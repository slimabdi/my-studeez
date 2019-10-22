import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesBulletinComponent } from './classes-bulletin.component';

describe('ClassesBulletinComponent', () => {
  let component: ClassesBulletinComponent;
  let fixture: ComponentFixture<ClassesBulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesBulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

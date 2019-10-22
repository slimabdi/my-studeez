import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingtoshowComponent } from './nothingtoshow.component';

describe('NothingtoshowComponent', () => {
  let component: NothingtoshowComponent;
  let fixture: ComponentFixture<NothingtoshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NothingtoshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NothingtoshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

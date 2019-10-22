import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderpageComponent } from './loaderpage.component';

describe('LoaderpageComponent', () => {
  let component: LoaderpageComponent;
  let fixture: ComponentFixture<LoaderpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

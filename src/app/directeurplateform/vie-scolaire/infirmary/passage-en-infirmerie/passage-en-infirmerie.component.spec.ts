import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassageEnInfirmerieComponent } from './passage-en-infirmerie.component';

describe('PassageEnInfirmerieComponent', () => {
  let component: PassageEnInfirmerieComponent;
  let fixture: ComponentFixture<PassageEnInfirmerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassageEnInfirmerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassageEnInfirmerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

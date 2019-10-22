import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedDocumentComponent } from './signed-document.component';

describe('SignedDocumentComponent', () => {
  let component: SignedDocumentComponent;
  let fixture: ComponentFixture<SignedDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCopComponent } from './add-cop.component';

describe('AddCopComponent', () => {
  let component: AddCopComponent;
  let fixture: ComponentFixture<AddCopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

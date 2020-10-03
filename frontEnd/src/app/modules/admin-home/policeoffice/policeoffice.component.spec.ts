import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceofficeComponent } from './policeoffice.component';

describe('PoliceofficeComponent', () => {
  let component: PoliceofficeComponent;
  let fixture: ComponentFixture<PoliceofficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceofficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

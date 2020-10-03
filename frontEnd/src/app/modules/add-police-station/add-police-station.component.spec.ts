import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoliceStationComponent } from './add-police-station.component';

describe('AddPoliceStationComponent', () => {
  let component: AddPoliceStationComponent;
  let fixture: ComponentFixture<AddPoliceStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPoliceStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPoliceStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

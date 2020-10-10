import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseHomeComponent } from './license-home.component';

describe('LicenseHomeComponent', () => {
  let component: LicenseHomeComponent;
  let fixture: ComponentFixture<LicenseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopHomeComponent } from './cop-home.component';

describe('CopHomeComponent', () => {
  let component: CopHomeComponent;
  let fixture: ComponentFixture<CopHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

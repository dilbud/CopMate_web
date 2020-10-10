import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopListComponent } from './cop-list.component';

describe('CopListComponent', () => {
  let component: CopListComponent;
  let fixture: ComponentFixture<CopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

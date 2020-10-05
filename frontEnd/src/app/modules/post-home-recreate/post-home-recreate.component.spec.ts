import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHomeRecreateComponent } from './post-home-recreate.component';

describe('PostHomeRecreateComponent', () => {
  let component: PostHomeRecreateComponent;
  let fixture: ComponentFixture<PostHomeRecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostHomeRecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHomeRecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

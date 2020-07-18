import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderNavComponent } from './user-header-nav.component';

describe('UserHeaderNavComponent', () => {
  let component: UserHeaderNavComponent;
  let fixture: ComponentFixture<UserHeaderNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHeaderNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

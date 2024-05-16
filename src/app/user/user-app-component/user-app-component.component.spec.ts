import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAppComponentComponent } from './user-app-component.component';

describe('UserAppComponentComponent', () => {
  let component: UserAppComponentComponent;
  let fixture: ComponentFixture<UserAppComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAppComponentComponent]
    });
    fixture = TestBed.createComponent(UserAppComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgetpassword2Component } from './forgetpassword2.component';

describe('Forgetpassword2Component', () => {
  let component: Forgetpassword2Component;
  let fixture: ComponentFixture<Forgetpassword2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Forgetpassword2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Forgetpassword2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgErrorHandlersComponent } from './ng-error-handlers.component';

describe('NgErrorHandlersComponent', () => {
  let component: NgErrorHandlersComponent;
  let fixture: ComponentFixture<NgErrorHandlersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgErrorHandlersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgErrorHandlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

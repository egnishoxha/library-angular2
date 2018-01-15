import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuthorFormComponent } from './add-author-form.component';

describe('AddAuthorFormComponent', () => {
  let component: AddAuthorFormComponent;
  let fixture: ComponentFixture<AddAuthorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuthorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

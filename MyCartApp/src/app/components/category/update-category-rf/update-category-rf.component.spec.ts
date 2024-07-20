import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryRfComponent } from './update-category-rf.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('UpdateCategoryRfComponent', () => {
  let component: UpdateCategoryRfComponent;
  let fixture: ComponentFixture<UpdateCategoryRfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCategoryRfComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(UpdateCategoryRfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryRfComponent } from './add-category-rf.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddCategoryRfComponent', () => {
  let component: AddCategoryRfComponent;
  let fixture: ComponentFixture<AddCategoryRfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCategoryRfComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(AddCategoryRfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

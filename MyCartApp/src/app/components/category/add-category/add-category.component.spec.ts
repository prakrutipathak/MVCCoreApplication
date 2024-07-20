import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryComponent } from './add-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['createCategory']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [AddCategoryComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]

    });
    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to /categories on successful category addition', () => {
    const mockResponse: ApiResponse<string> = { success: true, data: '', message: '' };
    categoryServiceSpy.createCategory.and.returnValue(of(mockResponse));
 
    const form = <NgForm><unknown>{
      valid: true,
      value: {
        categoryName: 'Test Category',
        categoryDescription: 'Test Description'
      },
      controls: {
        categoryName: { value: 'Test Category' },
        categoryDescription: { value: 'Test Description' }
      }
    };
 
    component.onSubmit(form);
 
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/categories']);
    expect(component.loading).toBe(false);
  });
 
  it('should alert error message on unsuccessful category addition', () => {
    spyOn(window, 'alert');
    const mockResponse: ApiResponse<string> = { success: false, data: '', message: 'Error adding category' };
    categoryServiceSpy.createCategory.and.returnValue(of(mockResponse));
 
    const form = <NgForm><unknown>{
      valid: true,
      value: {
        categoryName: 'Test Category',
        categoryDescription: 'Test Description'
      },
      controls: {
        categoryName: { value: 'Test Category' },
        categoryDescription: { value: 'Test Description' }
      }
    };
 
    component.onSubmit(form);
 
    expect(window.alert).toHaveBeenCalledWith('Error adding category');
    expect(component.loading).toBe(false);
  });
 
  it('should alert error message on HTTP error', () => {
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    categoryServiceSpy.createCategory.and.returnValue(throwError(mockError));
 
    const form = <NgForm><unknown>{
      valid: true,
      value: {
        categoryName: 'Test Category',
        categoryDescription: 'Test Description'
      },
      controls: {
        categoryName: { value: 'Test Category' },
        categoryDescription: { value: 'Test Description' }
      }
    };
 
    component.onSubmit(form);
 
    expect(window.alert).toHaveBeenCalledWith('HTTP error');
    expect(component.loading).toBe(false);
  });
 
  it('should not call categoryService.AddCategory on invalid form submission', () => {
    const form = <NgForm>{ valid: false };
 
    component.onSubmit(form);
 
    expect(categoryServiceSpy.createCategory).not.toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

});

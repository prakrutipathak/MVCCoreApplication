import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCategoryComponent } from './modify-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';

describe('ModifyCategoryComponent', () => {
  let component: ModifyCategoryComponent;
  let fixture: ComponentFixture<ModifyCategoryComponent>;
  let categoryServiceSpy: jasmine.SpyObj<CategoryService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;
  const mockCategory: Category = {
    categoryId: 1,
    categoryName: 'Test Category',
    categoryDescription: 'Test Description'
  };


  beforeEach(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ModifyCategoryComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ categoryId: 1 })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ModifyCategoryComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize categoryId from route params and load category details', () => {
    // Arrange
    const mockResponse: ApiResponse<Category> = { success: true, data: mockCategory, message: '' };
    categoryServiceSpy.getCategoryById.and.returnValue(of(mockResponse));
 
    // Act
    fixture.detectChanges(); // ngOnInit is called here
 
    // Assert
    expect(component.categoryId).toBe(1);
    expect(categoryServiceSpy.getCategoryById).toHaveBeenCalledWith(1);
    expect(component.category).toEqual(mockCategory);
  });
 
  it('should log error message if category loading fails', () => {
    // Arrange
    const mockResponse: ApiResponse<Category> = { success: false, data: mockCategory, message: 'Failed to fetch category' };
    categoryServiceSpy.getCategoryById.and.returnValue(of(mockResponse));
    spyOn(console, 'error');
 
    // Act
    fixture.detectChanges();
 
    // Assert
    expect(console.error).toHaveBeenCalledWith('Failed to fetch category', 'Failed to fetch category');
  });
 
  it('should alert error message on HTTP error', () => {
    // Arrange
    spyOn(window, 'alert');
    const mockError = { error: { message: 'HTTP error' } };
    categoryServiceSpy.getCategoryById.and.returnValue(throwError(mockError));
 
    // Act
    fixture.detectChanges();
 
    // Assert
    expect(window.alert).toHaveBeenCalledWith('HTTP error');
  });
 
  it('should log "Completed" when category loading completes', () => {
    // Arrange
    const mockResponse: ApiResponse<Category> = { success: true, data: mockCategory, message: '' };
    categoryServiceSpy.getCategoryById.and.returnValue(of(mockResponse));
    spyOn(console, 'log');
 
    // Act
    component.loadCategoryDetails(1); 
    fixture.detectChanges();
 
    // Assert
    expect(console.log).toHaveBeenCalledWith('Completed');
  });

});

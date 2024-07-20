import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsComponent } from './category-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from 'src/app/service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { of } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let route: ActivatedRoute;
  const mockCategory: Category = {
    categoryId:0, categoryName: '',
    categoryDescription: ''
  };


  beforeEach(() => {
    const categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryById']);
    TestBed.configureTestingModule({
      declarations: [CategoryDetailsComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ categoryId: 1 })
          }
        }
      ]

    });
    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>;
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize categoryId from route params and load category details', () => {
    // Arrange
    const mockResponse: ApiResponse<Category> = { success: true, data: mockCategory, message: '' };
    categoryService.getCategoryById.and.returnValue(of(mockResponse));
 
    // Act
    fixture.detectChanges(); // ngOnInit is called here
 
    // Assert
    expect(component.categoryId).toBe(1);
    expect(categoryService.getCategoryById).toHaveBeenCalledWith(1);
    expect(component.category).toEqual(mockCategory);
  });
 
  it('should log "Completed" when category loading completes', () => {
    // Arrange
    const mockResponse: ApiResponse<Category> = { success: true, data: mockCategory, message: '' };
    categoryService.getCategoryById.and.returnValue(of(mockResponse));
    spyOn(console, 'log');
 
    // Act
    component.loadCategoryDetails(1); 
    fixture.detectChanges();
 
    // Assert
    expect(console.log).toHaveBeenCalledWith('Completed');
  });

});

import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiResponse } from '../models/ApiResponse{T}';
import { Category } from '../models/category.model';
import { AddCategory } from '../models/AddCategory';
describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock:HttpTestingController;
  const mockApiResponse:ApiResponse<Category[]>={
    success:true,
    data:[
      { categoryId:1,
        categoryName:'Category 1',
        categoryDescription:'Description 1'
      },
      { categoryId:2,
        categoryName:'Category 2',
        categoryDescription:'Description 2'
      }

    ],
    message:''
  }
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock=TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpMock.verify();
    
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch all categories successfully',()=>{
    //Arrange
    const apiUrl='http://localhost:5144/api/Category/';
    //Act
    service.getAllCategories().subscribe((response)=>{
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);


    });
    const req= httpMock.expectOne(apiUrl+'GetAllCategories');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });
  it('should handle an empty categories list',()=>{
    const apiUrl='http://localhost:5144/api/Category/';
    const emptyResponse:ApiResponse<Category[]>={
      success:true,
      data:[],
      message:''
    }
    //Act
    service.getAllCategories().subscribe((response)=>{
      expect(response.data.length).toBe(0);
      expect(response.data).toEqual(emptyResponse.data);


    });
    const req= httpMock.expectOne(apiUrl+'GetAllCategories');
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);


  });
  it('should handle Http error gracefully',()=>{
    const apiUrl='http://localhost:5144/api/Category/';
    const errorMessage='Failed to load categories';
    //Act
    service.getAllCategories().subscribe( 
      ()=>fail('expected an error, not categories'),
      (error)=>{
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }    
    );
    const req= httpMock.expectOne(apiUrl+'GetAllCategories');
    expect(req.request.method).toBe('GET');
   // Respond with error
   req.flush(errorMessage,{status:500,statusText:'Internal Server Error'})
  });
  it('should add a category successfully',()=>{
    //arrange
    const addCategory:AddCategory={
      categoryName:'new category',
      categoryDescription:'Description of the new category'
    }
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      message:"Category saved successfully.",
      data:""
    }
    //act
    service.createCategory(addCategory).subscribe(response=>{
      //assert
      expect(response).toBe(mockSuccessResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/Create');
    expect(req.request.method).toBe('POST');
    req.flush(mockSuccessResponse);

  });
  it('should handle failed category addition',()=>{
    //arrange
    const addCategory:AddCategory={
      categoryName:'new category',
      categoryDescription:'Description of the new category'
    }
    const mockErrorResponse:ApiResponse<string>={
      success:true,
      message:"Category already exists.",
      data:""
    }
    //act
    service.createCategory(addCategory).subscribe(response=>{
      //assert
      expect(response).toBe(mockErrorResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/Create');
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse);

  });
  it('should handle Http error while adding category',()=>{
    //arrange
    const addCategory:AddCategory={
      categoryName:'new category',
      categoryDescription:'Description of the new category'
    };
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //act
    service.createCategory(addCategory).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/Create');
    expect(req.request.method).toBe('POST');
    req.flush({},mockHttpError);

  });
  it('should update a category successfully',()=>{
    //arrange
    const updateCategory:Category={
      categoryId:1,
      categoryName:'new category',
      categoryDescription:'Description of the new category'
    }
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      message:"Category updated successfully.",
      data:""
    }
    //act
    service.modifyCategory(updateCategory).subscribe(response=>{
      //assert
      expect(response).toBe(mockSuccessResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/ModifyCategory');
    expect(req.request.method).toBe('PUT');
    req.flush(mockSuccessResponse);

  });
  it('should handle failed to update category',()=>{
    //arrange
    const updateCategory:Category={
      categoryId:1,
      categoryName:'new category',
      categoryDescription:'Description of the new category'
    }
    const mockErrorResponse:ApiResponse<string>={
      success:true,
      message:"Category already exists.",
      data:""
    }
    //act
    service.modifyCategory(updateCategory).subscribe(response=>{
      //assert
      expect(response).toBe(mockErrorResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/ModifyCategory');
    expect(req.request.method).toBe('PUT');
    req.flush(mockErrorResponse);

  });
  it('should handle Http error while update category',()=>{
    //arrange
    const updateCategory:Category={
      categoryId:1,
      categoryName:'new category',
      categoryDescription:'Description of the new category'
    }
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //act
    service.modifyCategory(updateCategory).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/ModifyCategory');
    expect(req.request.method).toBe('PUT');
    req.flush({},mockHttpError);

  });
  it('should fetch a category by id successfully',()=>{
    const categoryId=1;
    const mockSuccessResponse:ApiResponse<Category>={
      success:true,
      data:{
        categoryId:1,
        categoryName:'Category 1',
        categoryDescription:'Description 1'
      },
      message:''

    };
    //Act
    service.getCategoryById(categoryId).subscribe(response=>{
      //Assert
      expect(response.success).toBeTrue();
      expect(response.message).toBe('');
      expect(response.data).toEqual(mockSuccessResponse.data);
      expect(response.data.categoryId).toEqual(categoryId);

    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/GetCategoryById/'+categoryId);
    expect(req.request.method).toBe('GET');
    req.flush(mockSuccessResponse);
  });
  it('should handle failed category retrival',()=>{
    const categoryId=1;
    const mockErrorResponse:ApiResponse<Category>={
      success:false,
      data:{} as Category,
      message:'No record Found',
    };
    //Act
    service.getCategoryById(categoryId).subscribe(response=>{
      //Assert
      expect(response.success).toBeFalse();
      expect(response).toEqual(mockErrorResponse);
      expect(response.message).toEqual('No record Found');
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/GetCategoryById/'+categoryId);
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse);
  });
  it('should handle Http error while category retrival',()=>{
    const categoryId=1;
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //Act
    service.getCategoryById(categoryId).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/GetCategoryById/'+categoryId);
    expect(req.request.method).toBe('GET');
    req.flush({},mockHttpError);
  });
  it('should delete a category by id successfully',()=>{
    const categoryId=1;
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      data:'',
      message:'Category deleted successfully.'

    };
    //Act
    service.deleteCategory(categoryId).subscribe(response=>{
      //Assert
      expect(response.success).toBeTrue();
      expect(response.message).toBe('Category deleted successfully.');
      expect(response.data).toEqual(mockSuccessResponse.data);
      

    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/Remove/'+categoryId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockSuccessResponse);
  });
  it('should handle failed category deletion',()=>{
    const categoryId=1;
    const mockErrorResponse:ApiResponse<string>={
      success:false,
      data:'',
      message:'No record Found',
    };
    //Act
    service.deleteCategory(categoryId).subscribe(response=>{
      //Assert
      expect(response.success).toBeFalse();
      expect(response).toEqual(mockErrorResponse);
      expect(response.message).toEqual('No record Found');
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/Remove/'+categoryId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockErrorResponse);
  });
  it('should handle Http error while category deletion',()=>{
    const categoryId=1;
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //Act
    service.deleteCategory(categoryId).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Category/Remove/'+categoryId);
    expect(req.request.method).toBe('DELETE');
    req.flush({},mockHttpError);
  });
});

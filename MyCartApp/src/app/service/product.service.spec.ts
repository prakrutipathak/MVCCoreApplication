import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../models/product.model';
import { ApiResponse } from '../models/ApiResponse{T}';
import { AddProduct } from '../models/AddProduct';
import { UpdateProduct } from '../models/updateProduct';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock:HttpTestingController;
  const mockApiResponse:ApiResponse<Product[]>={
    success:true,
    data:[
      {
        productId: 1,
        productName: "Product 1",
        productDescription: "Description",
        categoryId: 1,
        productPrice: 20,
        category: {
          categoryId: 1,
          name: "Category 1",
          description: "description 1",
          fileName: "abc.png",
        },
        inStock: false,
        isActive: false
      },
      {
        productId: 2,
        productName: "Product 2",
        productDescription: "Description",
        categoryId: 2,
        productPrice: 20,
        category: {
          categoryId: 2,
          name: "Category 2",
          description: "description 2",
          fileName: "abc.png",
        },
        inStock: true,
        isActive: false
      },
    ],
    message:''
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock=TestBed.inject(HttpTestingController);
  });
  afterEach(()=>{
    httpMock.verify();
    
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch all products successfully',()=>{
    //Arrange
    const apiUrl='http://localhost:5144/api/Product/';
    //Act
    service.getAllProducts().subscribe((response)=>{
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(mockApiResponse.data);


    });
    const req= httpMock.expectOne(apiUrl+'GetAllProducts');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);

  });
  it('should handle an empty products list',()=>{
    const apiUrl='http://localhost:5144/api/Product/';
    const emptyResponse:ApiResponse<Product[]>={
      success:true,
      data:[],
      message:''
    }
    //Act
    service.getAllProducts().subscribe((response)=>{
      expect(response.data.length).toBe(0);
      expect(response.data).toEqual(emptyResponse.data);


    });
    const req= httpMock.expectOne(apiUrl+'GetAllProducts');
    expect(req.request.method).toBe('GET');
    req.flush(emptyResponse);


  });
  it('should handle Http error gracefully',()=>{
    const apiUrl='http://localhost:5144/api/Product/';
    const errorMessage='Failed to load categories';
    //Act
    service.getAllProducts().subscribe( 
      ()=>fail('expected an error, not categories'),
      (error)=>{
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }    
    );
    const req= httpMock.expectOne(apiUrl+'GetAllProducts');
    expect(req.request.method).toBe('GET');
   // Respond with error
   req.flush(errorMessage,{status:500,statusText:'Internal Server Error'})
  });
  it('should add a product successfully',()=>{
    //arrange
    const addProduct:AddProduct={
      productName: "Product 1",
      productDescription: "Description",
      categoryId: 1,
      productPrice: 20,
      inStock: true,
      isActive: false
    }
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      message:"Product saved successfully.",
      data:""
    }
    //act
    service.createProduct(addProduct).subscribe(response=>{
      //assert
      expect(response).toBe(mockSuccessResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/AddProduct');
    expect(req.request.method).toBe('POST');
    req.flush(mockSuccessResponse);

  });
  it('should handle failed product addition',()=>{
    //arrange
    const addProduct:AddProduct={
      productName: "Product 1",
      productDescription: "Description",
      categoryId: 1,
      productPrice: 20,
      inStock: true,
      isActive: false
    }
    const mockErrorResponse:ApiResponse<string>={
      success:true,
      message:"Product already exists.",
      data:""
    }
    //act
    service.createProduct(addProduct).subscribe(response=>{
      //assert
      expect(response).toBe(mockErrorResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/AddProduct');
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse);

  });
  it('should handle Http error while adding product',()=>{
    //arrange
    const addProduct:AddProduct={
      productName: "Product 1",
      productDescription: "Description",
      categoryId: 1,
      productPrice: 20,
      inStock: true,
      isActive: false
    };
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //act
    service.createProduct(addProduct).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/AddProduct');
    expect(req.request.method).toBe('POST');
    req.flush({},mockHttpError);

  });
  it('should update a product successfully',()=>{
    //arrange
    const updateProduct:UpdateProduct={
      productId:1,
      productName: "Product 1",
      productDescription: "Description",
      categoryId: 1,
      productPrice: 20,
      inStock: true,
      isActive: false
    }
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      message:"Product updated successfully.",
      data:""
    }
    //act
    service.modifyProduct(updateProduct).subscribe(response=>{
      //assert
      expect(response).toBe(mockSuccessResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/Edit');
    expect(req.request.method).toBe('PUT');
    req.flush(mockSuccessResponse);

  });
  it('should handle failed to update product',()=>{
    //arrange
    const updateProduct:UpdateProduct={
      productId:1,
      productName: "Product 1",
      productDescription: "Description",
      categoryId: 1,
      productPrice: 20,
      inStock: true,
      isActive: false
    }
    const mockErrorResponse:ApiResponse<string>={
      success:true,
      message:"Product already exists.",
      data:""
    }
    //act
    service.modifyProduct(updateProduct).subscribe(response=>{
      //assert
      expect(response).toBe(mockErrorResponse);
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/Edit');
    expect(req.request.method).toBe('PUT');
    req.flush(mockErrorResponse);

  });
  it('should handle Http error while update Product',()=>{
    //arrange
    const updateProduct:UpdateProduct={
      productId:1,
      productName: "Product 1",
      productDescription: "Description",
      categoryId: 1,
      productPrice: 20,
      inStock: true,
      isActive: false
    }
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //act
    service.modifyProduct(updateProduct).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/Edit');
    expect(req.request.method).toBe('PUT');
    req.flush({},mockHttpError);

  });
  it('should fetch a product by id successfully',()=>{
    const productId=1;
    const mockSuccessResponse:ApiResponse<Product>={
      success:true,
      data: {
        productId: 1,
        productName: "Product 1",
        productDescription: "Description",
        categoryId: 1,
        productPrice: 20,
        category: {
          categoryId: 1,
          name: "Category 1",
          description: "description 1",
          fileName: "abc.png",
        },
        inStock: false,
        isActive: false
      },
      message:''

    };
    //Act
    service.getProductById(productId).subscribe(response=>{
      //Assert
      expect(response.success).toBeTrue();
      expect(response.message).toBe('');
      expect(response.data).toEqual(mockSuccessResponse.data);
      expect(response.data.productId).toEqual(productId);

    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/GetProductById/'+productId);
    expect(req.request.method).toBe('GET');
    req.flush(mockSuccessResponse);
  });
  it('should handle failed category retrival',()=>{
    const productId=1;
    const mockErrorResponse:ApiResponse<Product>={
      success:false,
      data:{} as Product,
      message:'No record Found',
    };
    //Act
    service.getProductById(productId).subscribe(response=>{
      //Assert
      expect(response.success).toBeFalse();
      expect(response).toEqual(mockErrorResponse);
      expect(response.message).toEqual('No record Found');
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/GetProductById/'+productId);
    expect(req.request.method).toBe('GET');
    req.flush(mockErrorResponse);
  });
  it('should handle Http error while product retrival',()=>{
    const productId=1;
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //Act
    service.getProductById(productId).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/GetProductById/'+productId);
    expect(req.request.method).toBe('GET');
    req.flush({},mockHttpError);
  });
  it('should delete a product by id successfully',()=>{
    const productId=1;
    const mockSuccessResponse:ApiResponse<string>={
      success:true,
      data:'',
      message:'Product deleted successfully.'

    };
    //Act
    service.deleteCategory(productId).subscribe(response=>{
      //Assert
      expect(response.success).toBeTrue();
      expect(response.message).toBe('Product deleted successfully.');
      expect(response.data).toEqual(mockSuccessResponse.data);
      

    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/Delete/'+productId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockSuccessResponse);
  });
  it('should handle failed product deletion',()=>{
    const productId=1;
    const mockErrorResponse:ApiResponse<string>={
      success:false,
      data:'',
      message:'No record Found',
    };
    //Act
    service.deleteCategory(productId).subscribe(response=>{
      //Assert
      expect(response.success).toBeFalse();
      expect(response).toEqual(mockErrorResponse);
      expect(response.message).toEqual('No record Found');
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/Delete/'+productId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockErrorResponse);
  });
  it('should handle Http error while product deletion',()=>{
    const productId=1;
    const mockHttpError={
      statusText:"Internal Server Error",
      status:500
    }
    //Act
    service.deleteCategory(productId).subscribe({
      next:()=>fail('should have failed with the 500 error'),
      error:(error)=>{
        //assert
      expect(error.status).toEqual(500);
      expect(error.statusText).toEqual('Internal Server Error');
      }
    });
    const req=httpMock.expectOne('http://localhost:5144/api/Product/Delete/'+productId);
    expect(req.request.method).toBe('DELETE');
    req.flush({},mockHttpError);
  });
});

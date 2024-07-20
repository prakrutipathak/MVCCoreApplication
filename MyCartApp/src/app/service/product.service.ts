import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse{T}';
import { Product } from '../models/product.model';
import { AddProduct } from '../models/AddProduct';
import { UpdateProduct } from '../models/updateProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl='http://localhost:5144/api/Product/';
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl+'GetAllProducts');
  }
  getProductById(productId:number |undefined):Observable<ApiResponse<Product>>{
    return this.http.get<ApiResponse<Product>>(this.apiUrl+'GetProductById/'+productId);
  }
  deleteCategory(productId:number |undefined):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.apiUrl+'Delete/'+productId);
  }
  createProduct(product: AddProduct): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl+'AddProduct', product);
  }
  modifyProduct(updateProduct:UpdateProduct):Observable<ApiResponse<string>>{
    return this.http.put<ApiResponse<string>>(this.apiUrl+"Edit",updateProduct);
  }
}

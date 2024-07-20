import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse{T}';
import { Category } from '../models/category.model';
import { AddCategory } from '../models/AddCategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl='http://localhost:5144/api/Category/';
  constructor(private http:HttpClient) { }
  getAllCategories():Observable<ApiResponse<Category[]>>{
    return this.http.get<ApiResponse<Category[]>>(this.apiUrl+'GetAllCategories');
  }
  createCategory(category: AddCategory): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(this.apiUrl+'Create', category);
  }
  getCategoryById(categoryId:number |undefined):Observable<ApiResponse<Category>>{
    return this.http.get<ApiResponse<Category>>(this.apiUrl+'GetCategoryById/'+categoryId);
  }
  modifyCategory(updateCategory:Category):Observable<ApiResponse<string>>{
    return this.http.put<ApiResponse<string>>(this.apiUrl+"ModifyCategory",updateCategory);
  }
  deleteCategory(categoryId:number |undefined):Observable<ApiResponse<string>>{
    return this.http.delete<ApiResponse<string>>(this.apiUrl+'Remove/'+categoryId);
  }
}

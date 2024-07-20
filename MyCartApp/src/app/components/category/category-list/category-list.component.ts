import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories:Category[] | undefined;
  loading:boolean=false;
  categoryId:number | undefined;
  constructor(private categoryService:CategoryService,private router: Router){}
  ngOnInit(): void {
this.loadCategories();
  }

loadCategories():void{
  this.loading = true;
  this.categoryService.getAllCategories().subscribe({
    next:(response: ApiResponse<Category[]>)=>{
      if(response.success){
        this.categories = response.data;
      }else{
        console.error('Failed to fetch categories',response.message);
      }
      this.loading = false;
    },
    error:(error)=>{
      console.error('Error fetching categories: ',error);
      this.loading = false;
    }
  });
}
categoryDetails(categoryId:number):void{
  this.router.navigate(['/categorydetails',categoryId])
}
confirmDelete(id:number):void{
  if(confirm('Are you sure?')){
    this.categoryId = id;
    this.deleteCategory();
  }
}

deleteCategory():void{
  this.categoryService.deleteCategory(this.categoryId).subscribe({
    next:(response)=>{
      if(response.success){
        this.loadCategories();
      }else{
        alert(response.message);
      }
    },
    error:(err)=>{
      alert(err.error.message);
    },
    complete:()=>{
      console.log('completed');
    }
  })
}

}

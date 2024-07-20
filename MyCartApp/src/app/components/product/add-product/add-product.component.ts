import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProduct } from 'src/app/models/AddProduct';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  categories:Category []=[];
  product:AddProduct={
    productName:'',
    productDescription:'',
    categoryId:0,
    productPrice:0,
    inStock:false,
    isActive:false,
  }
  loading:boolean=false;
  constructor(private productService:ProductService,private router: Router,private categoryService:CategoryService){}
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
          console.error('Failed to fetch categories ',response.message);
        }
        this.loading = false;
      },
      error:(error)=>{
        console.error('Error fetching categories: ',error);
        this.loading = false;
      }
    });
  }
  onSubmit(form:NgForm):void{
    if (form.valid) {
      this.loading=true;
      this.productService.createProduct(this.product)
        .subscribe({
          next:(response)=> {
            if (response.success) {
            console.log("Product created successfully:", response);
            this.router.navigate(['/products']);
            }
            else {
              alert(response.message);
            } 
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            alert(err.error.message);
          },
          complete: () => {
            this.loading = false;
            console.log('completed');
          }
    });
    }     
  }

}

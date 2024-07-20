import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProduct } from 'src/app/models/AddProduct';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product-rf',
  templateUrl: './add-product-rf.component.html',
  styleUrls: ['./add-product-rf.component.css']
})
export class AddProductRfComponent implements OnInit {
  loading:boolean=false;
  categories:Category []=[];
  productForm!:FormGroup;
  constructor(private productService:ProductService,private fb:FormBuilder,private router: Router,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.productForm=this.fb.group({
      productName:['',[Validators.required,Validators.minLength(2)]],
      productDescription:['',[Validators.required,Validators.minLength(2)]],
      categoryId:[0,[Validators.required,this.categoryValidator]],
      productPrice:[0,[Validators.required,Validators.min(0.01)]],
      inStock:[,Validators.required],
      isActive:[false],
    });
   this.loadCategories();
  }
  categoryValidator(controls:any){
    return controls.value=='' ? {invalidCategory:true}:null;
  }
  get formControls(){
    return this.productForm.controls;
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
  onSubmit(){
    if(this.productForm.valid){
      this.loading=true;
      console.log(this.productForm.value);
      this.productService.createProduct(this.productForm.value)
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

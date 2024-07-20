import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';
import { Category } from 'src/app/models/category.model';
import { UpdateProduct } from 'src/app/models/updateProduct';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit{
  productId:number|undefined;
  categories:Category []=[];
  product:UpdateProduct={
    productId:0,
    productName:'',
    productDescription:'',
    categoryId:0,
    productPrice:0,
    inStock:false,
    isActive:false,
  }
  loading:boolean=false;
  constructor(private productService:ProductService,private route:ActivatedRoute,private router: Router,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.productId = params['productId'];
      this.loadProductDetails(this.productId);
    });
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
  loadProductDetails(productId:number | undefined):void{
    this.productService.getProductById(productId).subscribe({
      next:(response)=>{
        if(response.success){
          this.product = response.data;
        }else{
          console.error('Failed to fech product: ',response.message);
        }
      },
      error:(error)=>{
        console.error('Error fetching products: ',error);
      }
    })
  }
  onSubmit(form:NgForm):void{
    if (form.valid) {
      this.loading=true;
      this.productService.modifyProduct(this.product)
        .subscribe({
          next:(response)=> {
            if (response.success) {
            console.log("Product updated successfully:", response);
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

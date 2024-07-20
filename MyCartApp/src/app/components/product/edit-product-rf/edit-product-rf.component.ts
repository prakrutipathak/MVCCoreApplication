import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product-rf',
  templateUrl: './edit-product-rf.component.html',
  styleUrls: ['./edit-product-rf.component.css']
})
export class EditProductRfComponent implements OnInit{
  loading:boolean=false;
  productId:number|undefined;
  categories:Category []=[];
  productForm!:FormGroup;
  constructor(private productService:ProductService,private route:ActivatedRoute,private fb:FormBuilder,private router: Router,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.productId = params['productId'];
      this.loadProductDetails(this.productId);
    });
    this.productForm=this.fb.group({
      productId:[],
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
  loadProductDetails(productId:number | undefined):void{
    this.productService.getProductById(productId).subscribe({
      next:(response)=>{
        if(response.success){
          this.productForm.patchValue({
            productId:response.data.productId,
            productName: response.data.productName,
            productDescription: response.data.productDescription,
            categoryId: response.data.categoryId,
            productPrice: response.data.productPrice,
            inStock: response.data.inStock,
            isActive: response.data.isActive
          });
        }else{
          console.error('Failed to fetch product: ',response.message);
        }
      },
      error:(error)=>{
        console.error('Error fetching products: ',error);
      }
    })
  }
  onSubmit(){
    if(this.productForm.valid){
      this.loading=true;
      console.log(this.productForm.value);
      this.productService.modifyProduct(this.productForm.value)
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

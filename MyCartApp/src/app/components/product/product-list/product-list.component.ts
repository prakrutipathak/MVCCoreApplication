import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ApiResponse } from 'src/app/models/ApiResponse{T}';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[] | undefined;
  loading:boolean=false;
  productId:number |undefined;
  constructor(private productService:ProductService,private router: Router){}
  ngOnInit(): void {
    this.loadProducts();
   
  }

loadProducts():void {
  this.loading=true;
  this.productService.getAllProducts().subscribe({
    next:(response:ApiResponse<Product[]>)=>{
    if(response.success){
      this.products=response.data;
    }
    else{
      console.error('Failed to fetch products',response.message)
    }
    this.loading=false;
  },
  error:(error)=>{
console.error('Error fetching category',error)
this.loading=false;
  }
  });
}
confirmDelete(id:number):void{
  if(confirm('Are you sure?')){
    this.productId = id;
    this.deleteProduct(this.productId);
  }
}

deleteProduct(id:number):void{
  this.productService.deleteCategory(this.productId).subscribe({
    next:(response)=>{
      if(response.success){
        this.loadProducts();
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
  this.router.navigate(['/products']);
}

}

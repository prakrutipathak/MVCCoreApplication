import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productId:number|undefined;
  product:Product ={
    productId: 0,
    productName: '',
    productDescription: 'Description',
    categoryId: 0,
    productPrice: 0,
    category: {
      categoryId: 7,
      name: '',
      description: '',
      fileName: '',
     
    },
    inStock: false,
    isActive: false
  };
  constructor(private productService:ProductService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.productId=params['productId'];
      this.loadProductDetails(this.productId);
     });
    
  }
  loadProductDetails(productId:number |undefined):void{
    this.productService.getProductById(productId).subscribe({
      next:(response)=>{
        if(response.success){
          this.product=response.data;
        }else{
          console.error('Failed to fetch',response.message);
        }
        
      },
      error:(err)=>{
        alert(err.error.message);
      },
      complete:()=>{
        console.log('Completed');
      }

    });
  }

}

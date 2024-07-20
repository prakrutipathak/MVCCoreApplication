import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit{
  categoryId:number |undefined;
  category:Category={
    categoryId:0,
    categoryName:'',
    categoryDescription:'',
  };
  constructor(private categoryService:CategoryService,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
     this.categoryId=params['categoryId'];
     this.loadCategoryDetails(this.categoryId);
    });
   
  }
  loadCategoryDetails(categoryId:number |undefined):void{
    this.categoryService.getCategoryById(categoryId).subscribe({
      next:(response)=>{
        if(response.success){
          this.category=response.data;
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

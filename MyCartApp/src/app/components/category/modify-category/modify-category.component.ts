import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-modify-category',
  templateUrl: './modify-category.component.html',
  styleUrls: ['./modify-category.component.css']
})
export class ModifyCategoryComponent {
  categoryId:number | undefined;
  loading : boolean = false;
  category:Category={
    categoryId:0,
    categoryName:'',
    categoryDescription:'',
  };
  constructor(private categoryService:CategoryService, private route:ActivatedRoute, private router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.categoryId = params['categoryId'];
      this.loadCategoryDetails(this.categoryId);
    })
  }
  loadCategoryDetails(categoryId:number | undefined):void{
    this.categoryService.getCategoryById(categoryId).subscribe({
      next:(response)=>{
        if(response.success){
          this.category = response.data;
        }else{
          console.error('Failed to fetch category',response.message);
        }
      },
      error:(err)=>{
        alert(err.error.message);
      },
      complete:()=>{
        this.loading = false;
        console.log("Completed");
      }
    })
  }
  onSubmit(updateCategoryTFForm:NgForm){
    if(updateCategoryTFForm.valid){
      this.loading = true;
      console.log(updateCategoryTFForm.value);
      let updateCategory :Category ={
        categoryId:updateCategoryTFForm.controls['categoryId'].value,
        categoryName:updateCategoryTFForm.controls['categoryName'].value,
        categoryDescription:updateCategoryTFForm.controls['categoryDescription'].value,
      };
      this.categoryService.modifyCategory(updateCategory).subscribe({
        next:(response)=>{
          if(response.success){
            this.router.navigate(['/categories']);
          }else{
            alert(response.message);
          }
          this.loading = false;
        },
        error:(err)=>{
          console.log(err.error.message);
          this.loading = false;
          alert(err.error.message);
        },
        complete:()=>{
          this.loading = false;
          console.log("Completed");
        }
      });
    }
  }

}

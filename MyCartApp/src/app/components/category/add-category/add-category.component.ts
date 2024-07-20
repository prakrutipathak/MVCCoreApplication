import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategory } from 'src/app/models/AddCategory';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category={
    categoryName:'',
    categoryDescription:'',
  };
  loading:boolean=false;
  constructor(private categoryService: CategoryService ,private router: Router) {}
  onSubmit(addCategoryTFForm:NgForm){
    if(addCategoryTFForm.valid){
      this.loading = true;
      console.log(addCategoryTFForm.value);
      let addCategory :AddCategory ={
        categoryName:addCategoryTFForm.controls['categoryName'].value,
        categoryDescription:addCategoryTFForm.controls['categoryDescription'].value,
      };
      this.categoryService.createCategory(addCategory).subscribe({
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
          this.loading=false;
          alert(err.error.message);
        },
        complete:()=>{
          this.loading=false;
          console.log("completed");
        }
      });
    }
  }

}

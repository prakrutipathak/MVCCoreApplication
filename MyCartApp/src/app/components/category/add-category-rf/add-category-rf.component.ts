import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category-rf',
  templateUrl: './add-category-rf.component.html',
  styleUrls: ['./add-category-rf.component.css']
})
export class AddCategoryRfComponent implements OnInit {
  loading:boolean=false;
  categoryForm!:FormGroup;
  constructor(private fb:FormBuilder,private router: Router,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.categoryForm=this.fb.group({
      categoryName:['',[Validators.required,Validators.minLength(2)]],
      categoryDescription:['',[Validators.required,Validators.minLength(2)]],
    });
    
  }
  get formControls(){
    return this.categoryForm.controls;
  }
  onSubmit(){
    if(this.categoryForm.valid){
      this.loading=true;
      console.log(this.categoryForm.value);
      this.categoryService.createCategory(this.categoryForm.value)
      .subscribe({
        next:(response)=> {
          if (response.success) {
          console.log("Category created successfully:", response);
          this.router.navigate(['/categories']);
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

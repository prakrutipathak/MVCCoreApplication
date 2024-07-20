import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-update-category-rf',
  templateUrl: './update-category-rf.component.html',
  styleUrls: ['./update-category-rf.component.css']
})
export class UpdateCategoryRfComponent  implements OnInit{
  loading:boolean=false;
  categoryId:number|undefined;
  categoryForm!:FormGroup;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router: Router,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.categoryId = params['categoryId'];
      this.loadCategoryDetails(this.categoryId);
    });
    this.categoryForm=this.fb.group({
      categoryId:[],
      categoryName:['',[Validators.required,Validators.minLength(2)]],
      categoryDescription:['',[Validators.required,Validators.minLength(2)]],
    });
  }
  get formControls(){
    return this.categoryForm.controls;
  }
  loadCategoryDetails(categoryId:number | undefined):void{
    this.categoryService.getCategoryById(categoryId).subscribe({
      next:(response)=>{
        if(response.success){
          this.categoryForm.patchValue({
            categoryId: response.data.categoryId,
            categoryName: response.data.categoryName,
            categoryDescription: response.data.categoryDescription,
          });
        }else{
          console.error('Failed to fetch category: ',response.message);
        }
      },
      error:(error)=>{
        console.error('Error fetching categories: ',error);
      }
    })
  }
  onSubmit(){
    if(this.categoryForm.valid){
      this.loading=true;
      console.log(this.categoryForm.value);
      this.categoryService.modifyCategory(this.categoryForm.value)
      .subscribe({
        next:(response)=> {
          if (response.success) {
          console.log("Category updated successfully:", response);
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

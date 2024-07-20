import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { PracticeComponent } from './components/example/practice/practice.component';
import { ForloopComponent } from './components/example/forloop/forloop.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { PipeExampleComponent } from './components/example/pipe-example/pipe-example.component';
import { TemplateFormComponent } from './components/example/template-form/template-form.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ModifyCategoryComponent } from './components/category/modify-category/modify-category.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ModifyProductComponent } from './components/product/modify-product/modify-product.component';
import { CategoryDetailsComponent } from './components/category/category-details/category-details.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ReactiveFormComponent } from './components/example/reactive-form/reactive-form.component';
import { AddProductRfComponent } from './components/product/add-product-rf/add-product-rf.component';
import { EditProductRfComponent } from './components/product/edit-product-rf/edit-product-rf.component';
import { AddCategoryRfComponent } from './components/category/add-category-rf/add-category-rf.component';
import { UpdateCategoryRfComponent } from './components/category/update-category-rf/update-category-rf.component';
import { SignupSuccessComponent } from './components/auth/signup-success/signup-success.component';
import { authGuard } from './guards/auth.guard';
import { CategoriesProductComponent } from './components/example/categories-product/categories-product.component';
import { ChildComponent } from './components/example/child/child.component';
import { ParentComponent } from './components/example/parent/parent.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'privacy',component:PrivacyComponent},
  {path:'categories',component:CategoryListComponent,canActivate:[authGuard]},
  {path:'products',component:ProductListComponent,canActivate:[authGuard]},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'signupsuccess',component:SignupSuccessComponent},
  {path:'ngif',component:PracticeComponent},
  {path:'ngfor',component:ForloopComponent},
  {path:'pipes',component:PipeExampleComponent},
  {path:'template',component:TemplateFormComponent},
  {path:'addCategory',component:AddCategoryComponent,canActivate:[authGuard]},
  {path:'categorydetails/:categoryId',component:CategoryDetailsComponent,canActivate:[authGuard]},
  {path:'modifyCategory/:categoryId',component:ModifyCategoryComponent,canActivate:[authGuard]},
  {path:'addProduct',component:AddProductComponent,canActivate:[authGuard]},
  {path:'modifyProduct/:productId',component:ModifyProductComponent,canActivate:[authGuard]},
  {path:'detailsproduct/:productId',component:ProductDetailsComponent,canActivate:[authGuard]},
  {path:'reactiveform',component:ReactiveFormComponent},
  {path:'addProductrf',component:AddProductRfComponent,canActivate:[authGuard]},
  {path:'modifyProductrf/:productId',component:EditProductRfComponent,canActivate:[authGuard]},
  {path:'addCategoryrf',component:AddCategoryRfComponent,canActivate:[authGuard]},
  {path:'modifyCategoryrf/:categoryId',component:UpdateCategoryRfComponent,canActivate:[authGuard]},
  {path:'categoriesproduct',component:CategoriesProductComponent},
  {path:'child',component:ChildComponent},
  {path:'parent',component:ParentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

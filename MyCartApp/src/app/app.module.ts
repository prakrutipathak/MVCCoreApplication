import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { PracticeComponent } from './components/example/practice/practice.component';
import { ForloopComponent } from './components/example/forloop/forloop.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { PipeExampleComponent } from './components/example/pipe-example/pipe-example.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TemplateFormComponent } from './components/example/template-form/template-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthService } from './service/auth.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CategoriesProductComponent } from './components/example/categories-product/categories-product.component';
import { ExampleNavbarComponent } from './components/shared/example-navbar/example-navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ChildComponent } from './components/example/child/child.component';
import { ParentComponent } from './components/example/parent/parent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivacyComponent,
    CategoryListComponent,
    ProductListComponent,
    SignupComponent,
    SigninComponent,
    PracticeComponent,
    ForloopComponent,
    PipeExampleComponent,
    CapitalizePipe,
    TemplateFormComponent,
    AddCategoryComponent,
    ModifyCategoryComponent,
    AddProductComponent,
    ModifyProductComponent,
    CategoryDetailsComponent,
    ProductDetailsComponent,
    ReactiveFormComponent,
    AddProductRfComponent,
    EditProductRfComponent,
    AddCategoryRfComponent,
    UpdateCategoryRfComponent,
    SignupSuccessComponent,
    CategoriesProductComponent,
    ExampleNavbarComponent,
    FooterComponent,
    ChildComponent,
    ParentComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthService,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

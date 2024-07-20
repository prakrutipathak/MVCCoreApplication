import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesProductComponent } from './categories-product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryListComponent } from '../../category/category-list/category-list.component';
import { ProductListComponent } from '../../product/product-list/product-list.component';

describe('CategoriesProductComponent', () => {
  let component: CategoriesProductComponent;
  let fixture: ComponentFixture<CategoriesProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesProductComponent,CategoryListComponent,ProductListComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
    });
    fixture = TestBed.createComponent(CategoriesProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProductComponent } from './modify-product.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModifyProductComponent', () => {
  let component: ModifyProductComponent;
  let fixture: ComponentFixture<ModifyProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyProductComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
    });
    fixture = TestBed.createComponent(ModifyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

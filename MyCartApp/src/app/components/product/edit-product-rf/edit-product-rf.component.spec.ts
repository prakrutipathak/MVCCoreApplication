import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductRfComponent } from './edit-product-rf.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EditProductRfComponent', () => {
  let component: EditProductRfComponent;
  let fixture: ComponentFixture<EditProductRfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProductRfComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(EditProductRfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

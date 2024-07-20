import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductRfComponent } from './add-product-rf.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddProductRfComponent', () => {
  let component: AddProductRfComponent;
  let fixture: ComponentFixture<AddProductRfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductRfComponent],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(AddProductRfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

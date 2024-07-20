import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNavbarComponent } from './example-navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExampleNavbarComponent', () => {
  let component: ExampleNavbarComponent;
  let fixture: ComponentFixture<ExampleNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExampleNavbarComponent],
      imports:[HttpClientTestingModule,RouterTestingModule],
    });
    fixture = TestBed.createComponent(ExampleNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

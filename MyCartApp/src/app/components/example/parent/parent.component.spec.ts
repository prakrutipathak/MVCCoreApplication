import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentComponent } from './parent.component';
import { ChildComponent } from '../child/child.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponent,ChildComponent]
    });
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

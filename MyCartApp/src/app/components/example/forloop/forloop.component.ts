import { Component } from '@angular/core';

@Component({
  selector: 'app-forloop',
  templateUrl: './forloop.component.html',
  styleUrls: ['./forloop.component.css']
})
export class ForloopComponent {
//ngfor
Categories=[
  {categoryId:1,categoryName:'Category 1',categoryDescription:'Description 1'},
  {categoryId:2,categoryName:'Category 2',categoryDescription:'Description 2'},
  {categoryId:3,categoryName:'Category 3',categoryDescription:'Description 3'}
]
}

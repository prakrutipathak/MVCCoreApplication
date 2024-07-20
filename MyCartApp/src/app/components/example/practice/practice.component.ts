import { Component } from '@angular/core';

@Component({
  selector: 'app-practice',
  //template:`<h1>{{pageTitle}}</h1>`
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent {
  // string interpolation
  pageTitle:string="My Cart";
  //ngif directive
  isLogged:boolean=true;

}

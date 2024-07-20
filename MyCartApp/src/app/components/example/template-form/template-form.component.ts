import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
  user = {
    name: 'prakruti',
    email: '',
    age: null,
     website: '',
    gender: '',
    country: '',
    interests: {
      sports: false,
      music: false,
      travel: false
    }
  };
  onSubmit(form:NgForm){
    if(form.valid){
      console.log("Form submitted", form.value);
    }
    
  }
  countries = ['USA', 'Canada','UK'];

}

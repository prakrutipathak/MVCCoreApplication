import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomvalidatorService } from 'src/app/service/helpers/customvalidator.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  registerForm!:FormGroup;
  submitted=false;
  constructor(private formBuilder:FormBuilder,private customValidator:CustomvalidatorService){}
  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      username:['',Validators.required],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmPassword: ['', [Validators.required]],

    },
    {
      validators:this.customValidator.MatchPassword('password','confirmPassword'),
    }
  );
  }
  get registerFormControl(){
    return this.registerForm.controls;
  }
  onSubmit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    }
  }

}

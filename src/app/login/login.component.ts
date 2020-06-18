import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, EmailValidator, Validators, CheckboxRequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor( fb: FormBuilder) { 
    this.loginForm = fb.group({
      'email':[''],
      'pwd':[''],
      'checkbox':[false]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    console.log("O valor do formulário é ", form);
  }
}

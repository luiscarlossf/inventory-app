import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, EmailValidator, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as UserActions from 'src/app/user/user.actions';
import * as fromUser from 'src/app/user/user.reducer';
import { Observable } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor( fb: FormBuilder, private readonly store: Store<{user:fromUser.UserState}>, private router: Router) { 
    this.loginForm = fb.group({
      'email':[''],
      'password':[''],
      'checkbox':[false]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    let payload = {email: form.email, password:form.password, connected: form.checkbox};
    console.log("O valor do formulário é ", payload);
    this.store.dispatch(UserActions.login(form));
  }
}

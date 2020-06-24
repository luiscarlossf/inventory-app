import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, EmailValidator, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../user/user.actions';
import * as fromUser from '../user/user.reducer';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user$: Observable<fromUser.UserState>;
  
  constructor( fb: FormBuilder, private readonly store: Store<{user:fromUser.UserState}>, private router: Router) { 
    this.loginForm = fb.group({
      'email':[''],
      'password':[''],
      'checkbox':[false]
    });
    this.user$ = store.pipe(select('user'));
  }

  ngOnInit(): void {
    this.user$.subscribe(
      user => {
        console.log("User subscribe!");
        if(user.currentUser){
          this.router.navigate(['home']).then(()=> console.log('Lindo!'));
        }else{
          console.log("Erro no login");
        }
    });
  }

  onSubmit(form: any){
    let payload = {email: form.email, password:form.password, connected: form.checkbox};
    console.log("O valor do formulário é ", payload);
    this.store.dispatch(UserActions.login(form));
  }
}

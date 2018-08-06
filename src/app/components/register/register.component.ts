import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupName} from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  post: any;

  firstName: string = '';
  lastName: string = '';
  password: string = '';
  email: string = '';
  admin: boolean = false;
  registerKey: string = '';

  registerKeyError: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    {
      this.registerForm = this.formBuilder.group({
        'firstName': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(256)])],
        'lastName': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(256)])],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
        'email': [null, Validators.compose([Validators.required, Validators.pattern('[^ @]*@[^ @]*')])],
        'registerKey': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(256)])],
        'admin': false,
      });
    }
  }

  registerUser(post, isValid: boolean) {

    const requestObject = {
      firstName: post.firstName,
      lastName: post.lastName,
      password: post.password,
      email: post.email,
      registerKey: post.registerKey,
      admin: post.admin,
    };

    console.log(requestObject, isValid);
    if (post.registerKey !== environment.registerKey) {
      alert('Registry key is invalid, please try again.');
      this.registerForm.reset();
      this.registerKeyError = true;
    } else {
      alert('You have successfully registered, you may now login.');
      this.router.navigate(['/login']);
    }
  }
}

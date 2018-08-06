import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userId: string;
  password: string;
  isAdmin: boolean;
  loading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      'userId': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.maxLength(256)])]
    });
   }

  ngOnInit() {
  }

  onLoginSubmit(post) {
    const requestObject = {
      userId: post.userId,
      password: post.password,
    };
    if (post.password !== environment.password && post.userId !== environment.userId) {
      alert('Password or UserId is invalid, please try again.');
      this.loginForm.reset();
    } else {
      this.loading = true;
      this.router.navigate(['/dashboard']);
    }
  }
}

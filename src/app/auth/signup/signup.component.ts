import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private passwordValidator: MatchPassword,
    private usernameValidator: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  authForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], 
    [
      this.usernameValidator.validate
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
    passwordConfirmation: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ]),
  }, { validators: [this.passwordValidator.validate]});

  ngOnInit(): void {}

  onSubmit(){
    if (this.authForm.invalid){
      return;
    }

    this.authService.signup(this.authForm.value)
    .subscribe({
      next: response => {
        this.router.navigateByUrl('/inbox');
      },
      error: err => {
        if (!err.status){
          this.authForm.setErrors({ noConnection: true });
        }else{
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

}

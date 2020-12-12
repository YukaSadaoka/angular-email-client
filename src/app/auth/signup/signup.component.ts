import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private passwordValidator: MatchPassword, private usernameValidator: UniqueUsername){}

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
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
    passwordConfirm: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15)
    ]),
  }, { validators: [this.passwordValidator.validate]});

  ngOnInit(): void {}
}

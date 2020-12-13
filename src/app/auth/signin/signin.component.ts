import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
 
  // Signin ReactiveForm  
  signinForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)
    ])
  })

  ngOnInit(): void {}

  onSubmit(){
    if (this.signinForm.invalid){
      return;
    }

    this.authService.signin(this.signinForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) => { 
        if (error.username || error.password){
          this.signinForm.setErrors({ credentials: true });
        }else if(!error.status) {
          this.signinForm.setErrors({ noConnection: true });
        }else{
          this.signinForm.setErrors({ unknownError: true });
        }
      }
    });

  }
}

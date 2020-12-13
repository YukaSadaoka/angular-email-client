import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService){
    // Pass a BehaviorSubject subscriber to determin if user signed in or not
    this.signedin$ = this.authService.signedin$; 
  } 

  ngOnInit(){
    // Call Auth Service to check if user authenticated
    this.authService.checkAuth().subscribe((response) => {});
  }
}

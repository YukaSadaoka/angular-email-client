import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthHttpInterceptor } from '../auth-http-interceptor';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    // After successful signout, navigate user to the root
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/')
    });
  }

}

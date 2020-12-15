import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Email } from '../email';


@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {
  email: Email;

  constructor(private route: ActivatedRoute) {
    // This ensures this.email is assigned in case if the subscription takes time to emit email data 
    this.email = route.snapshot.data.email;

    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

}

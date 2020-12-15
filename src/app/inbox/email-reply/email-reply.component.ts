import { Component, OnInit, Input } from '@angular/core';

import { Email } from '../email';
import { EmailService } from '../email.service';


@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email: Email;

  constructor(private emailService: EmailService) { 
  }

  // Create email content when user click Reply button
  ngOnChanges(): void {
    const text = this.email.text.replace(/\n/gi, '\n> ');

    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n-------- ${this.email.from} wrote:\n ${text}`
    }
  }

  // Disable modal component when email sent
  onSubmit(email: Email){
    
    this.emailService.sendEmail(email).subscribe(() =>{
      this.showModal = false;
    })
  }

}

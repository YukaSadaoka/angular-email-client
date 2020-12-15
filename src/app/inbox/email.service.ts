import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

// For getEmails()
interface EmailSummary{
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com'

  constructor(private http: HttpClient) { }

  // GET request to emails endpoint
  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`);
  }

  // GET request to eamils/id endpoint
  getEmailDetail(id: string){
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}/`);
  }

  // POST request to emails endpoint
  sendEmail(email: Email){
    return this.http.post<Email>(`${this.rootUrl}/emails`, email);
  }

}

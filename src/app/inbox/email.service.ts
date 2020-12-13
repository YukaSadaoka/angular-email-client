import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
  rootUtl = 'https://api.angular-email.com'

  constructor(private http: HttpClient) { }

  // GET request to emails endpoint
  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.rootUtl}/emails`);
  }

}

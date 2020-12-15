import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Email } from './email';
import { EmailService } from './email.service';


@Injectable({
  providedIn: 'root'
})

// Resolve for EmailService
export class EmailResolverService implements Resolve<Email> {
  constructor(private emailService: EmailService, private route: Router){}

  resolve(route: ActivatedRouteSnapshot){
    const { id } = route.params;
    return this.emailService.getEmailDetail(id).pipe(
      catchError(() => {
        this.route.navigateByUrl('/inbox/not-found')

        return EMPTY;
      })
    );
  }

}

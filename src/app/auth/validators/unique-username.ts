import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';


// Validate a username in async fashion
// Implement Dependency Injection to user HttpClient
@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator{
    
    constructor(private authService: AuthService){}

    // Bind the anonymous function to the super.validate()
    validate = (control: FormControl) => {

        const { value } = control;

        return this.authService.checkUsernameAvail(value).pipe(
            map((value) => { return null; }),
            catchError((err) =>{

                // If there is no username attribute in the return observable,
                // return notUnique tag
                if (err.error.username){
                    return of({ notUnique: true });
                }else{
                    return of({ noConnection: true });
                }
            })
        );
    }
}

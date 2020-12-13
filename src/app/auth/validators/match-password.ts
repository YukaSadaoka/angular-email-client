import { Injectable } from '@angular/core';

import { Validators, FormGroup } from '@angular/forms';


// Define a sync custom validator to check passwords
@Injectable({providedIn: 'root'})
export class MatchPassword implements Validators{
    validate(formGroup: FormGroup ){
        const { password, passwordConfirmation } = formGroup.value;

        if (password === passwordConfirmation ){
            return null;
        }else{
            return {
                passwordDontMatch: true
            };
        }
    }
}

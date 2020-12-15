import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Email } from '../email';


@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  @Output() emailSubmit = new EventEmitter();
  @Input() email: Email;
  emailForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;
    
    // Initialize the values in the form
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    })
  }

  // If the emailForm is valid, emits the values of the form to the parent 
  onSubmit(){
    if (this.emailForm.invalid){
      return;
    }
    
    this.emailSubmit.emit(this.emailForm.getRawValue());
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxHomeComponent } from './inbox-home/inbox-home.component';
import { EmailPlaceholderComponent } from './email-placeholder/email-placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';


const routes: Routes = [
  { 
    path: '', component: InboxHomeComponent, 
    children: [
      { path: '', component: EmailPlaceholderComponent },
      { path: ':id', component: EmailShowComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }

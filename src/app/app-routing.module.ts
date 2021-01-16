import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)},
  { path: 'inbox', canLoad: [AuthGuard], loadChildren: () => import('./inbox/inbox.module').then(mod => mod.InboxModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

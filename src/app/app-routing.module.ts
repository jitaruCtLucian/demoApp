import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./features/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'contacts', loadChildren: () => import('./features/contact/contact.module')
      .then(m => m.ContactModule)
  },
  {
    path: '**', redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

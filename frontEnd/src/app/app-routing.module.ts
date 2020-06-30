import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  // {
  //   path: 'admin',
  //   component: AdminComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'account', component: ProfilePageComponent, canActivate: [AuthGuardService],
  //   children: [
  //     { path: '', component: ProfilePageBaseComponent },
  //     { path: 'edit', component: UpdateComponent }
  //   ]
  // },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

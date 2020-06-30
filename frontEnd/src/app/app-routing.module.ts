import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: '',
  //   component: QuestionListComponent
  // },
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
  // { path: '**', component: QuestionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

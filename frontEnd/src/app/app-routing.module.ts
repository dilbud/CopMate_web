import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { AuthGuardService } from './data/services/auth-guard.service';
import { CopHomeComponent } from './modules/cop-home/cop-home.component';
import { PostHomeComponent } from './modules/post-home/post-home.component';
import { LicenseHomeComponent } from './modules/license-home/license-home.component';
import { AddCopComponent } from './modules/add-cop/add-cop.component';
import { CopListComponent } from './modules/cop-list/cop-list.component';
import { ReportComponent } from './modules/report/report.component';
import * as UserTypes from './data/models/userType';
import { AdminHomeComponent } from './modules/admin-home/admin-home.component';
import { AddLicenseComponent } from './modules/add-license/add-license.component';
import { LicenseListComponent } from './modules/license-list/license-list.component';
<<<<<<< HEAD
import { ProfileComponent } from './modules/profile/profile.component';

const routes: Routes = [
  {
    path: '',component: LoginComponent,

    // canActivate: [AuthGuardService],
    // redirectTo: 'post',
    // redirectTo: 'cop',
    // pathMatch: 'full',
    // { path: '', component: LoginComponent },
    // { path: 'profileUpdate', component: ProfileComponent },
=======
import { PoliceStationComponent } from './modules/police-station/police-station.component';
import { PostOfficeComponent } from './modules/post-office/post-office.component';
import { AddPoliceStationComponent } from './modules/add-police-station/add-police-station.component';
import { AddPostOfficeComponent } from './modules/add-post-office/add-post-office.component';
import { PostHomeRecreateComponent } from './modules/post-home-recreate/post-home-recreate.component';

const routes: Routes = [
  {
    path: '',
    // component: LoginComponent,
    redirectTo: UserTypes.post,
    pathMatch: 'full',
>>>>>>> nipuni
  },
  {path: 'profile', component: ProfileComponent},
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: UserTypes.admin,
    component: AdminHomeComponent,
    // canActivate: [AuthGuardService],
<<<<<<< HEAD
=======
    children: [
      { path: '', redirectTo: 'addPoliceStation', pathMatch: 'full' },
      { path: 'policeStation', component: PoliceStationComponent },
      { path: 'postOffice', component: PostOfficeComponent },
      { path: 'addPoliceStation', component: AddPoliceStationComponent },
      { path: 'addPostOffice', component: AddPostOfficeComponent },
    ],
>>>>>>> nipuni
  },
  {
    path: UserTypes.cop,
    component: CopHomeComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: '',redirectTo: 'copList', pathMatch: 'full' },
      { path: 'addCop', component: AddCopComponent },
      { path: 'copList', component: CopListComponent },
      { path: 'report', component: ReportComponent },
    ],
  },
  {
    path: UserTypes.post,
<<<<<<< HEAD
    component: PostHomeComponent,
=======
    component: PostHomeRecreateComponent,
>>>>>>> nipuni
    // canActivate: [AuthGuardService],
  },
  {
    path: UserTypes.license,
    component: LicenseHomeComponent,
<<<<<<< HEAD
    canActivate: [AuthGuardService],
=======
    // canActivate: [AuthGuardService],
>>>>>>> nipuni
    children: [
      { path: '', redirectTo: 'addLicense', pathMatch: 'full' },
      { path: 'addLicense', component: AddLicenseComponent },
      { path: 'licenseList', component: LicenseListComponent },
    ],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

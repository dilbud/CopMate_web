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
import { PoliceStationComponent } from './modules/police-station/police-station.component';
import { PostOfficeComponent } from './modules/post-office/post-office.component';
import { AddPoliceStationComponent } from './modules/add-police-station/add-police-station.component';
import { AddPostOfficeComponent } from './modules/add-post-office/add-post-office.component';

const routes: Routes = [
  {
    path: '',
    // component: LoginComponent,
    redirectTo: 'cop',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: UserTypes.admin,
    component: AdminHomeComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'addPoliceStation', pathMatch: 'full' },
      { path: 'policeStation', component: PoliceStationComponent },
      { path: 'postOffice', component: PostOfficeComponent },
      { path: 'addPoliceStation', component: AddPoliceStationComponent },
      { path: 'addPostOffice', component: AddPostOfficeComponent },
    ],
  },
  {
    path: UserTypes.cop,
    component: CopHomeComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'copList', pathMatch: 'full' },
      { path: 'addCop', component: AddCopComponent },
      { path: 'copList', component: CopListComponent },
      { path: 'report', component: ReportComponent },
    ],
  },
  {
    path: UserTypes.post,
    component: PostHomeComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: UserTypes.license,
    component: LicenseHomeComponent,
    // canActivate: [AuthGuardService],
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

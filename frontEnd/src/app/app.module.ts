import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './core/auth-interceptor';
import { AuthGuardService } from './data/services/auth-guard.service';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';
import { DataModule } from './data/data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CopHomeComponent } from './modules/cop-home/cop-home.component';
import { PostHomeComponent } from './modules/post-home/post-home.component';
import { LicenseHomeComponent } from './modules/license-home/license-home.component';
import { AddCopComponent } from './modules/add-cop/add-cop.component';
import { CopListComponent } from './modules/cop-list/cop-list.component';
import { ReportComponent } from './modules/report/report.component';
import { AdminHomeComponent } from './modules/admin-home/admin-home.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    CopHomeComponent,
    PostHomeComponent,
    LicenseHomeComponent,
    AddCopComponent,
    CopListComponent,
    ReportComponent,
    AdminHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 850,
      preventDuplicates: true,
    }),
    QRCodeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

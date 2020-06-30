import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { UserListComponent } from './modules/user-list/user-list.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    UserListComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DataModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

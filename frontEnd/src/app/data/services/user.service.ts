import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Subject, Observable } from 'rxjs';
import { environment } from '@env';

import { Observable, throwError,Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { AuthData } from '../models/authData';
import { UserData } from '../models/userData';
import * as UserTypes from '../models/userType';
import { SignupData } from '../models/signupData';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.baseUrl + 'user';
  private authStatusListener = new Subject<boolean>();
  private token = null;
  private tokenTimer: any;
  private isAuthenticated: boolean;
  private user: UserData;
  private userTypes = UserTypes;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public login(email: string, password: string) {
    const authData: AuthData = { email, password };
    let res: any;
    this.http.post(this.apiUrl + '/login', authData).subscribe(
      (response) => {
        res = response;
      },
      (error) => {
        if (error.error.msg) {
          this.toastr.error(error.error.msg);
        } else {
          this.toastr.error('Try Again');
        }
      },
      () => {
        console.log(res);
        this.user = res.serverData;
        this.token = res.token;
        this.storeToken(this.token);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.setAuthTimer();
        this.toastr.success('Login success').onHidden.subscribe((val) => {
          // this.router.navigate([this.user.userType]);
          this.router.navigate(['profile']);
        });
      }
    );
  }

  public signup(data: SignupData) {
    let res: any;
    this.http.post(this.apiUrl + '/signup', { data }).subscribe(
      (response) => {
        res = response;
      },
      (error) => {
        if (error.error.msg) {
          this.toastr.error(error.error.msg);
        } else {
          this.toastr.error('Try Again');
        }
      },
      () => {
        this.toastr
          .success('Wait For Admin Verify !')
          .onHidden.subscribe(() => {
            this.toastr
              .success('please check mail box')
              .onHidden.subscribe(() => {
                this.router.navigate(['']);
              });
          });
      }
    );
  }

  public getUserType(): string {
    return this.user.userType;
  }
  public getUser(): UserData {
    return this.user;
    this.router.navigate(['/']);

  // public getUser(): Observable<any> { console.log('user service')
  // return this.http.post('profile' + '/profile', {});
}

public getdetails(): Observable<any> {
  return this.http.post(this.apiUrl + '/profile', {});
  let url = `${this.apiUrl}/profile`;
    return this.http.post(this.apiUrl + '/profile', {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      // catchError(this.errorMgmt)
    )
}

// public getdetails(){
//   return this.http.get(this.apiUrl + '/profile');
// }

  public getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  public autoAuthUser(): void {
    const token = this.getToken();
    const decoded = this.decodeToken(token);
    if (decoded === null || decoded === undefined) {
      this.logout();
      return;
    } else {
      this.user = {
        _id: decoded.id,
        firstName: decoded.userData.firstName,
        lastName: decoded.userData.lastName,
        email: decoded.userData.email,
        userType: decoded.userData.userType,
        policeStation: decoded.userData.policeStation,
        copId: decoded.userData.copId,
        postOffice: decoded.userData.postOffice,
        nic: decoded.userData.nic,
        active: decoded.userData.active,
        pending: decoded.userData.pending,
        emailVerified: decoded.userData.emailVerified,
      };
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimer();
      this.toastr.success('Login success').onHidden.subscribe((val) => {
        this.router.navigate([this.user.userType]);
      });
      return;
    }
  }

  private setAuthTimer() {
    const data = this.getToken();
    const tokenObj = this.decodeToken(data);
    const now = new Date().getTime();
    const duration = tokenObj.exp * 1000 - now;
    const isAlive = !tokenObj.isExp;
    if (isAlive) {
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration);
    } else {
      this.logout();
    }
  }

  public getAuthStatusListener(): any {
    return this.authStatusListener.asObservable();
  }

  public logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearToken();
    this.router.navigate(['/']);
  }

  public getToken(): any {
    const localStorageServerTokenData = localStorage.getItem('token101');
    if (localStorageServerTokenData) {
      return localStorageServerTokenData;
    } else {
      return null;
    }
  }

  private storeToken(data: string) {
    localStorage.setItem('token101', data);
  }

  private clearToken() {
    localStorage.removeItem('token101');
  }

  private decodeToken(token: string): any {
    if (token === null || token === 'undefined') {
      return null;
    }
    const payload = token.split('.')[1];
    const bodyJSON = JSON.parse(atob(payload));
    const now = new Date().getTime();
    const bool = !(now < bodyJSON.exp * 1000 && bodyJSON.iat * 1000 < now);
    const obj = {
      id: bodyJSON.id,
      iat: bodyJSON.iat,
      exp: bodyJSON.exp,
      isExp: bool,
      userData: bodyJSON.userData,
    };
    return obj;
  }
}

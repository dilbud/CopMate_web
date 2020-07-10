import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from '@env';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LicenseService {
  private apiUrl = environment.baseUrl + 'license';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  public addLicense(data: any) {
    console.log('this is data : ', data);
    let res: any;
    this.http.post(this.apiUrl + '/addLicense', { data }).subscribe(
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
        this.toastr.success('Saved');
      }
    );
  }

  public licenseList(filter: string): Observable<any> {
    return this.http.post(this.apiUrl + '/licenseList', { filter });
  }

  public licenseUpdate(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/licenseUpdate', { data });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from '@env';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CopService {
  private apiUrl = environment.baseUrl + 'policeStation';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public addCop(data: any) {
    console.log('this is data : ', data);
    let res: any;
    this.http.post(this.apiUrl + '/addCop', { data }).subscribe(
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

  public copList(): Observable<any> {
    return this.http.post(this.apiUrl + '/copList', {});
  }
}

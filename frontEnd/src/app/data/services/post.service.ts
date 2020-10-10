import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from '@env';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = environment.baseUrl + 'post';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }


  public fineList(filter: string): Observable<any> {
    return this.http.post(this.apiUrl + '/fineList', { filter });
  }
}

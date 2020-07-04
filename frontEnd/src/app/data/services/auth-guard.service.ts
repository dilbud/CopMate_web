import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.userService.getIsAuth();
    const userType = this.userService.getUserType();
    if (!isAuth) {
      this.router.navigate(['/']);
    }
    if (userType === route.routeConfig.path) {
      return isAuth;
    } else {
      this.toastr.error('Please Login');
      this.router.navigate(['/']);
      return false;
    }
  }
}

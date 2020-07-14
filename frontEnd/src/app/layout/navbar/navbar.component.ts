import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isAuth = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isAuth = this.userService.getIsAuth();
    this.userService.getAuthStatusListener().subscribe((isAuth: boolean) => {
      this.isAuth = isAuth;
    });
  }
  public navHome() {
    this.router.navigate(['']);
  }

  public logout() {
    this.userService.logout();
  }
  public profile() {
    this.router.navigate(['/profile']);
    // this.userService.getUser();
    
  }
}

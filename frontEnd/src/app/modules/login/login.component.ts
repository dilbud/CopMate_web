import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/data/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public login: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.autoAuthUser();
    this.login = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required, Validators.email]],
      Ctrl_2: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  // login
  public send() {
    if (this.login.valid) {
      const email = this.login.value.Ctrl_1;
      const password = this.login.value.Ctrl_2;
      this.userService.login(email, password);
      this.login.reset({ Ctrl_1: email, Ctrl_2: '' });
    } else {
      this.login.markAllAsTouched();
    }
  }

  // reset password
  public resetPassword() { }

  // signup
  public signup() {
    this.router.navigate(['signup']);
  }
}

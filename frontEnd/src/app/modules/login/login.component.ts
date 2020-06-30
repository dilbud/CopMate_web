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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required, Validators.email]],
      Ctrl_2: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // login
  public send() {
    this.userService.login('gggggg', 'gggggggggg');
  }
  // reset password
  public resetPassword() {}
}

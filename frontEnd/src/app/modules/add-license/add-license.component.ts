import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicenseService } from 'src/app/data/services/license.service';
import { UserData } from 'src/app/data/models/userData';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.scss']
})
export class AddLicenseComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private licenseService: LicenseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required]],
      Ctrl_2: ['', [Validators.required]],
      Ctrl_3: ['', [Validators.required]]
    });
  }

  submit() {
    const name = this.form.value.Ctrl_1;
    const nic = this.form.value.Ctrl_2;
    const licenseId = this.form.value.Ctrl_3;
    const data = {
      name,
      nic,
      licenseId,
    };
    this.licenseService.addLicense(data);
  }

}

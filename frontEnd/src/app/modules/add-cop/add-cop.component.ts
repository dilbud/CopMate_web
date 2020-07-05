import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CopService } from '../../data/services/cop.service';
import { cop, post, license } from 'src/app/data/models/userType';

@Component({
  selector: 'app-add-cop',
  templateUrl: './add-cop.component.html',
  styleUrls: ['./add-cop.component.scss'],
})
export class AddCopComponent implements OnInit {
  formAddCop: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private copService: CopService
  ) {}

  ngOnInit(): void {
    this.formAddCop = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required]],
      Ctrl_2: ['', [Validators.required]],
      Ctrl_3: ['', [Validators.required]],
      Ctrl_4: ['', [Validators.required, Validators.email]],
      Ctrl_5: ['', [Validators.required]],
    });
  }
  submit() {
    const firstName = this.formAddCop.value.Ctrl_1;
    const lastName = this.formAddCop.value.Ctrl_2;
    const nic = this.formAddCop.value.Ctrl_3;
    const email = this.formAddCop.value.Ctrl_4;
    const id = this.formAddCop.value.Ctrl_5;
    const data = {
      firstName,
      lastName,
      nic,
      email,
      id,
    };
    this.copService.addCop(data);
  }
}

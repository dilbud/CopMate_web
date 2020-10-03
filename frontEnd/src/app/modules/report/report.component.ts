import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CopService } from 'src/app/data/services/cop.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/data/services/user.service';
import { UserData } from 'src/app/data/models/userData';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  private user: UserData;
  public form: FormGroup;

  public fileURL: any;

  public myFilter = (d: Date | null): boolean => {
    const day = d || new Date();
    const today = new Date();

    const slectMili = new Date(
      day.getUTCFullYear(),
      day.getUTCMonth(),
      day.getUTCDate()
    ).getTime();
    const todatMili = new Date(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    ).getTime();
    return slectMili <= todatMili;
  };

  constructor(
    private formBuilder: FormBuilder,
    private copService: CopService,
    private toastr: ToastrService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.form = this.formBuilder.group({
      date: [{ value: new Date(), disabled: true }],
    });

  }

  public downloadPdf() {
    const current = new Date(this.form.value.date);

    const time = new Date(
      current.getUTCFullYear(),
      current.getUTCMonth(),
      current.getUTCDate()
    ).getTime();
    const policeStation = this.user.policeStation;
    let res: any = null;
    console.log(time);

    this.copService.getPdf({ time, policeStation }).subscribe(
      (response) => {
        res = response;
      },
      (error) => {
        if (error.error.msg) {
          this.toastr.error(error.error.msg);
        } else {
          console.log(error.error);
          this.toastr.error('Canceled');
        }
      },
      () => {
        console.log(res);
        const file = new Blob([res], { type: 'application/pdf' });
        this.fileURL = URL.createObjectURL(file);
        console.log(this.fileURL);
        console.log(res.headers.get('content-disposition'));
        // const fileLink = document.createElement('a');
        // fileLink.href = this.fileURL;
        // fileLink.download = 'dddddddddd.pdf';
        // fileLink.click();
        // window.open(`$fileUrl`, 'gggggggggg.pdf');
        this.toastr.success('pdf Downloaded');
      }
    );
  }
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

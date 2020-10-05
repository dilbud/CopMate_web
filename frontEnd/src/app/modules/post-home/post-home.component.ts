// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CopService } from 'src/app/data/services/cop.service';
// import { ToastrService } from 'ngx-toastr';
// import { UserService } from 'src/app/data/services/user.service';
// import { UserData } from 'src/app/data/models/userData';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html',
//   styleUrls: ['./report.component.scss'],
// })
// export class ReportComponent implements OnInit {
//   private user: UserData;

//   public form: FormGroup;
//   public myFilter = (d: Date | null): boolean => {
//     const day = d || new Date();
//     const today = new Date();

//     const slectMili = new Date(
//       day.getUTCFullYear(),
//       day.getUTCMonth(),
//       day.getUTCDate()
//     ).getTime();
//     const todatMili = new Date(
//       today.getUTCFullYear(),
//       today.getUTCMonth(),
//       today.getUTCDate()
//     ).getTime();
//     return slectMili < todatMili;
//   };

//   constructor(
//     private formBuilder: FormBuilder,
//     private copService: CopService,
//     private toastr: ToastrService,
//     private userService: UserService
//   ) {}

//   ngOnInit(): void {
//     this.user = this.userService.getUser();
//     this.form = this.formBuilder.group({
//       date: [{ value: new Date(), disabled: true }],
//     });
//   }

//   public downloadPdf() {
//     const current = new Date(this.form.value.date);

//     const time = new Date(
//       current.getUTCFullYear(),
//       current.getUTCMonth(),
//       current.getUTCDate()
//     ).getTime();
//     const policeStation = this.user.policeStation;
//     let res: any;
//     this.copService.getPdf({ time, policeStation }).subscribe(
//       (response) => {
//         res = response;
//       },
//       (error) => {
//         if (error.error.msg) {
//           this.toastr.error(error.error.msg);
//         } else {
//           this.toastr.error('Try Again');
//         }
//       },
//       () => {
//         this.toastr.success('pdf Downloaded');
//       }
//     );
//   }
// }
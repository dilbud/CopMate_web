import { Component, OnInit, ViewChild } from '@angular/core';
// import { UserService , UserDetails} from '../../data/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { subscribeOn } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/data/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserData } from 'src/app/data/models/userData';

export interface RowData {
  no: string;
  name: string;
  nic: string;
  email: string;
  officerId: string;
  status: string;
  row: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
     private user : UserData
     editForm: FormGroup;
      FilterList: any[] = []
      allAppTable: any[] = [];

      Employee:any = [];

      @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
      dataSource: MatTableDataSource<RowData>;
  constructor(
    private userService : UserService,
    private router: Router,
    private toastr:ToastrService,
    private formBuilder: FormBuilder

    ) {this.readEmployee(); }

  ngOnInit() {
    // this.user = this.userService.getUser();


  }

public readEmployee(){
this.userService.getdetails().subscribe((data) => {
  this.Employee = data;
})
  // const policeStation = this.user.policeStation;

//   let res: any;
//     this.userService.getdetails().subscribe(
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
//       // () => {
//       //   this.toastr.success('pdf Downloaded');
//       // }

//       () => {
//         this.FilterList = [
//           // ...this.FilterList,
//           ...res.serverData,
//         ];
//         this.createTable();
//       }
//     );


}

getEmployee(id) {
  this.userService.getdetails().subscribe(data => {
    this.editForm.setValue({
      name: data['name'],
      email: data['email'],
      designation: data['designation'],
      phoneNumber: data['phoneNumber'],
    });
  });
}

private createTable() {
  this.FilterList.forEach((val, index) => {
    const single: RowData = {
      no: (index + 1).toString(),
      name: val.name ? val.name : val.firstName + ' ' + val.lastName,
      nic: val.nic,
      email: val.email,
      officerId: val.officerId ? val.officerId : val.id,
      status: val.status ? val.status : val.active ? 'Active' : 'Inactive',
      row: val,
    };
    this.allAppTable.push(single);
  });

  this.dataSource = new MatTableDataSource(this.allAppTable);
  this.dataSource.paginator = this.paginator;
  // this.dataSource.sort = this.sort;
}

}

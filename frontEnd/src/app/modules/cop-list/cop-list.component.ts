import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CopService } from '../../data/services/cop.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Subscriber, Subject } from 'rxjs';

export interface Field {
  value: string;
  viewValue: string;
}

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
  selector: 'app-cop-list',
  templateUrl: './cop-list.component.html',
  styleUrls: ['./cop-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CopListComponent implements OnInit {
  formAddCop: FormGroup;

  // @Input() user: ServerData;
  List: any[] = [];
  FilterList: any[] = [
    {
      no: 1,
      name: 'DP Kumara',
      nic: '922382686V',
      email: 'kumara@gmail.com',
      officerId: '15854526',
      status: 'active',
    },
    {
      no: 2,
      name: 'GP saman',
      nic: '912372696V',
      email: 'saman@gmail.com',
      officerId: '25853526',
      status: 'active',
    },
    {
      no: 3,
      name: 'SM Gunawardana',
      nic: '922382686V',
      email: 'Gunawardana@gmail.com',
      officerId: '15854526',
      status: 'active',
    },
    {
      no: 4,
      name: 'JK Kalum',
      nic: '902342681V',
      email: 'Kalum@gmail.com',
      officerId: '65855521',
      status: 'Inactive',
    },
  ];
  allUser: any[] = [];
  allAppTable: any[] = [];
  fields: Field[] = [];

  time = 'up';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'name', 'nic', 'email', 'officerId', 'status'];

  expandedElement: RowData | null;

  constructor(
    private copService: CopService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // this.filter('up');
    this.formAddCop = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required]],
      Ctrl_2: ['', [Validators.required]],
      Ctrl_3: ['', [Validators.required]],
      Ctrl_4: ['', [Validators.required, Validators.email]],
      Ctrl_5: ['', [Validators.required]],
    });

    let res: any;
    this.copService.copList().subscribe(
      (response) => {
        res = response;
      },
      (error) => {
        if (error.error.msg) {
          this.toastr.error(error.error.msg);
        } else {
        }
      },
      () => {
        this.FilterList = [
          // ...this.FilterList,
          ...res.serverData,
        ];
        this.createTableRow();
      }
    );
  }

  private createTableRow() {
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
    this.dataSource.sort = this.sort;
  }

  reInit(val: any) {
    this.time = val;
    this.FilterList = [];
    this.allAppTable = [];
    this.filter(this.time);
    this.createTableRow();
  }

  private filter(val: any) {
    if (val === 'past') {
      this.FilterList = this.List.filter((value) => {
        return Date.parse(value.endTime) <= Date.now();
      });
    }
    if (val === 'up') {
      this.FilterList = this.List.filter((value) => {
        return Date.parse(value.startTime) >= Date.now();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setForm(row: any) {
    this.formAddCop.setValue({
      Ctrl_1: row.firstName,
      Ctrl_2: row.lastName,
      Ctrl_3: row.nic,
      Ctrl_4: row.email,
      Ctrl_5: row.id,
    });
    this.formAddCop.disable();
  }
  resetForm(row: any) {
    this.formAddCop.setValue({
      Ctrl_1: row.firstName,
      Ctrl_2: row.lastName,
      Ctrl_3: row.nic,
      Ctrl_4: row.email,
      Ctrl_5: row.id,
    });
  }
  submit(uId: string) {
    if (this.formAddCop.valid) {
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
      let res: any;
      this.copService.copUpdate({ data, uId }).subscribe(
        (response) => {
          res = response;
        },
        (error) => {
          if (error.error.msg) {
            this.toastr.error(error.error.msg);
          } else {
            this.toastr.error('Try Again');
          }
        },
        () => {
          const newAllAppTable = this.allAppTable.map((val, index) => {
            if (val.row._id === uId) {
              return {
                ...val,
                email: res.serverData.email,
                name: res.serverData.firstName + ' ' + res.serverData.lastName,
                nic: res.serverData.nic,
                officerId: res.serverData.id,
                row: res.serverData,
                status: res.serverData.active ? 'Active' : 'Inactive',
              };
            } else {
              return val;
            }
          });
          this.allAppTable = [...newAllAppTable];
          this.toastr.success('Update Success').onHidden.subscribe((val) => {
            this.dataSource = new MatTableDataSource(this.allAppTable);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        }
      );
    } else {
    }
  }
  changeState(row: any) {
    const data = {
      active: !row.active,
    };
    let res: any;
    this.copService.copUpdate({ data, uId: row._id }).subscribe(
      (response) => {
        res = response;
      },
      (error) => {
        if (error.error.msg) {
          this.toastr.error(error.error.msg);
        } else {
          this.toastr.error('Try Again');
        }
      },
      () => {
        const newAllAppTable = this.allAppTable.map((val, index) => {
          if (val.row._id === row._id) {
            return {
              ...val,
              email: res.serverData.email,
              name: res.serverData.firstName + ' ' + res.serverData.lastName,
              nic: res.serverData.nic,
              officerId: res.serverData.id,
              row: res.serverData,
              status: res.serverData.active ? 'Active' : 'Inactive',
            };
          } else {
            return val;
          }
        });
        this.allAppTable = [...newAllAppTable];
        this.toastr.success('Update Success').onHidden.subscribe((val) => {
          this.dataSource = new MatTableDataSource(this.allAppTable);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    );
  }
}

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicenseService } from '../../data/services/license.service';

import { ToastrService } from 'ngx-toastr';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export interface Field {
  value: string;
  viewValue: string;
}

export interface RowData {
  no: string;
  name: string;
  nic: string;
  licenseId: string;
  amount: string;
  row: any;
}

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.scss'],
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
export class PostHomeComponent implements OnInit {
  formAddLicense: FormGroup;

  FilterList: any[] = [];
  allAppTable: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'name', 'nic', 'licenseId', 'amount'];

  expandedElement: RowData | null;

  constructor(
    private licenseService: LicenseService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formAddLicense = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required]],
      Ctrl_2: ['', [Validators.required]],
      Ctrl_3: ['', [Validators.required]]
    });
    this.dataSource = new MatTableDataSource(this.allAppTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private createTableRow() {

    this.FilterList.forEach((val, index) => {
      const single: RowData = {
        no: (index + 1).toString(),
        name: val.name,
        nic: val.nic,
        licenseId: val.licenseId,
        amount: val.active ? 'Active' : 'Inactive',
        row: val,
      };
      this.allAppTable.push(single);
    });

    this.dataSource = new MatTableDataSource(this.allAppTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


  }


  applyFilter(input: HTMLInputElement) {

    this.FilterList = [];
    this.allAppTable = [];
    this.dataSource = new MatTableDataSource(this.allAppTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const filterValue = input.value;

    if (filterValue.trim().toLowerCase() !== '') {

      let res: any;
      this.licenseService.licenseList(filterValue.trim().toLowerCase()).subscribe(
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
          console.log(res.serverData);
          this.FilterList = [
            ...res.serverData,
          ];
          this.createTableRow();
        }
      );

      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }

    } else {
      this.dataSource = new MatTableDataSource(this.allAppTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  setForm(row: any) {
    this.formAddLicense.setValue({
      Ctrl_1: row.name,
      Ctrl_2: row.nic,
      Ctrl_3: row.licenseId,
    });
    this.formAddLicense.disable();
  }
  resetForm(row: any) {
    this.formAddLicense.setValue({
      Ctrl_1: row.name,
      Ctrl_2: row.nic,
      Ctrl_3: row.licenseId,
    });
  }
  submit(lId: string) {
    if (this.formAddLicense.valid) {
      const name = this.formAddLicense.value.Ctrl_1;
      const nic = this.formAddLicense.value.Ctrl_2;
      const licenseId = this.formAddLicense.value.Ctrl_3;
      const data = {
        name,
        nic,
        licenseId,
      };
      let res: any;
      this.licenseService.licenseUpdate({ data, lId }).subscribe(
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
            if (val.row._id === lId) {
              return {
                ...val,
                name: res.serverData.name,
                nic: res.serverData.nic,
                licenseId: res.serverData.licenseId,
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
    this.licenseService.licenseUpdate({ data, lId: row._id }).subscribe(
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
              name: res.serverData.name,
              nic: res.serverData.nic,
              licenseId: res.serverData.licenseId,
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

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../data/services/post.service';

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
  filterName: string;

  timerId: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<RowData>;
  columnsToDisplay = ['no', 'name', 'nic', 'licenseId', 'amount'];

  expandedElement: RowData | null;

  constructor(
    private postService: PostService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formAddLicense = this.formBuilder.group({
      Ctrl_1: ['', [Validators.required]],
      Ctrl_2: ['', [Validators.required]],
      Ctrl_3: ['', [Validators.required]],
      Ctrl_4: ['', [Validators.required]]
    });
    this.dataSource = new MatTableDataSource(this.allAppTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private createTableRow() {
    this.FilterList.forEach((val, index) => {
      const single: RowData = {
        no: (index + 1).toString(),
        name: val.driverName,
        nic: val.driverNIC,
        licenseId: val.driverLicenseId,
        amount: val.fine.reduce((pv: any, cv: any) => {
          return pv + +cv.amount;
        }, 0),
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

    clearTimeout(this.timerId);

    this.timerId = setTimeout(() => {
      if (filterValue.trim().toLowerCase() !== '') {

        let res: any;
        this.postService.fineList(filterValue.trim().toLowerCase()).subscribe(
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
            console.log(res.serverData, '------------------------------');
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
    }, 800);
  }

  setForm(row: any) {
    this.formAddLicense.setValue({
      Ctrl_1: row.driverName,
      Ctrl_2: row.driverNIC,
      Ctrl_3: row.driverLicenseId,
      Ctrl_4: row.fine.reduce((pv: any, cv: any) => {
        return pv + +cv.amount;
      }, 0)
    });
    this.formAddLicense.disable();
  }
  resetForm(row: any) {
    this.formAddLicense.setValue({
      Ctrl_1: row.driverName,
      Ctrl_2: row.driverNIC,
      Ctrl_3: row.driverLicenseId,
      Ctrl_4: row.fine.reduce((pv: any, cv: any) => {
        return pv + +cv.amount;
      }, 0)
    });
  }
  submit(lId: string) {

    window.open(`http://localhost:3000/api/post/setFine/${lId}`, '_blank');
    this.FilterList = [];
    this.allAppTable = [];
    this.dataSource = new MatTableDataSource(this.allAppTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.createTableRow();
    this.filterName = '';

  }
  changeState(row: any) {

  }
}

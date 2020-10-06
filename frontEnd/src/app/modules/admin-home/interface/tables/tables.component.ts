import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  name: string;
  number: number;
  year: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'name1', number: '1596245', year: '2020' },
  { position: 2, name: 'name2',number: '1258942', year: '2017' },
  { position: 3, name: 'name3',number: '1526378', year: '2016' },
  { position: 4, name: 'name4',number: '1555470', year: '2015' },
  { position: 5, name: 'name5',number: '1515589', year: '2019' },
];

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = ['position', 'name' , 'number', 'year' , 'deleteEmployee'];
  dataSource = ELEMENT_DATA;
}

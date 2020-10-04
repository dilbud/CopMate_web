import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  name: string;
  user: string;
  }
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'name1', user: 'postoffice' },
  { position: 2, name: 'name2', user: 'postoffice' },
  { position: 3, name: 'name3', user: 'policeoffice' },
  { position: 4, name: 'name4', user: 'postoffice' },
  { position: 5, name: 'name5', user: 'policeoffice' },
  { position: 6, name: 'name6', user: 'postoffice' },
  { position: 7, name: 'name7', user: 'policeoffice' },
];

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss'],
})
export class UseraccountComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = ['position', 'name', 'user', 'deleteEmployee'];
  dataSource = ELEMENT_DATA;
}

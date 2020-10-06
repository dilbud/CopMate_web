import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  name: string;
  fine: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'fine1', fine: '1500' },
  { position: 2, name: 'fine2', fine: '2000' },
  { position: 3, name: 'fine3', fine: '2500' },
  { position: 4, name: 'fine4', fine: '2500' },
  { position: 5, name: 'fine5', fine: '1000' },
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = ['position', 'name', 'fine', 'deleteEmployee'];
  dataSource = ELEMENT_DATA;
}

import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  plname: string;
  discrict: string;
  division: string;
  }
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    plname: 'Borella',
    discrict: 'colombo',
    division: 'colombo-central',
 },
  {
    position: 2,
    plname: 'kollupitiya',
    discrict: 'colombo',
    division: 'colombo-western',
},
  {
    position: 3,
    plname: 'fort',
    discrict: 'colombo',
    division: 'colombo-North',
},
  {
    position: 4,
    plname: 'Bambalapitiya',
    discrict: 'colombo',
    division: 'colombo-western',
},
  {
    position: 5,
    plname: 'Maradana',
    discrict: 'colombo',
    division: 'colombo-central',
 },
];

@Component({
  selector: 'app-policeoffice',
  templateUrl: './policeoffice.component.html',
  styleUrls: ['./policeoffice.component.scss'],
})
export class PoliceofficeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'position',
    'plname',
    'discrict',
    'division',
    'deleteEmployee',
];
  dataSource = ELEMENT_DATA;
}

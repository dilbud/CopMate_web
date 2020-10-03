import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  plname: string;
  discrict: string;
  division: string;
  Action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    plname: 'Hydrogen',
    discrict: 'Hydrogen',
    division: 'true',
    Action: 'true',
  },
  {
    position: 2,
    plname: 'Helium',
    discrict: 'Hydrogen',
    division: 'true',
    Action: 'false',
  },
  {
    position: 3,
    plname: 'Lithium',
    discrict: 'Hydrogen',
    division: 'true',
    Action: 'false',
  },
  {
    position: 4,
    plname: 'Beryllium',
    discrict: 'Hydrogen',
    division: 'true',
    Action: 'true',
  },
  {
    position: 5,
    plname: 'Boron',
    discrict: 'Hydrogen',
    division: 'true',
    Action: 'true',
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
    'Action',
  ];
  dataSource = ELEMENT_DATA;
}

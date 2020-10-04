import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: number;
  psname: string;
  code: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, psname: 'colombo', code: 'C01'   },
  { position: 2, psname: 'gampaha', code: 'G02'  },
  { position: 3, psname: 'kaluthara', code: 'K03'  },
  { position: 4, psname: 'galle', code: 'G06'  },
  { position: 5, psname: 'matara', code: 'M07'  },
];

@Component({
  selector: 'app-postoffice',
  templateUrl: './postoffice.component.html',
  styleUrls: ['./postoffice.component.scss'],
})
export class PostofficeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = ['position', 'psname', 'code','deleteEmployee' ];
  dataSource = ELEMENT_DATA;
}

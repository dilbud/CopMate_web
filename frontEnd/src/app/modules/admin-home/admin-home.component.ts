import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  public links = [
    { path: 'policeStation', label: 'Police Station' },
    { path: 'postOffice', label: 'Post Office' },
    { path: 'addPoliceStation', label: 'Add Police Station' },
    { path: 'addPostOffice', label: 'Add Post Office' },
  ];
  public activeLink = this.links[0];
  public background: ThemePalette = undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.navigateLink(this.links[0].path);
  }
  public navigateLink(path: any): void {
    this.router.navigate([path], { relativeTo: this.route });
  }
}

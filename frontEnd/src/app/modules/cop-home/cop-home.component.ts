import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cop-home',
  templateUrl: './cop-home.component.html',
  styleUrls: ['./cop-home.component.scss'],
})
export class CopHomeComponent implements OnInit {
  public links = [
    { path: 'addCop', label: 'Add Cop' },
    { path: 'copList', label: 'Cop List' },
    { path: 'report', label: 'Report' },
  ];
  public activeLink = this.links[1];
  public background: ThemePalette = undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.navigateLink(this.links[1].path);
  }
  public navigateLink(path: any): void {
    this.router.navigate([path], { relativeTo: this.route });
  }
}

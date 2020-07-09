import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-license-home',
  templateUrl: './license-home.component.html',
  styleUrls: ['./license-home.component.scss']
})
export class LicenseHomeComponent implements OnInit {

  public links = [
    { path: 'addLicense', label: 'Add License' },
    { path: 'licenseList', label: 'License List' }
  ];
  public activeLink = this.links[0];
  public background: ThemePalette = undefined;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public navigateLink(path: any): void {
    this.router.navigate([path], { relativeTo: this.route });
  }

}

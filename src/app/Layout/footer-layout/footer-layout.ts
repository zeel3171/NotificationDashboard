import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-layout',
  imports: [],
  templateUrl: './footer-layout.html',
  styleUrl: './footer-layout.scss',
})
export class FooterLayout {
  currentYear = new Date().getFullYear();
}

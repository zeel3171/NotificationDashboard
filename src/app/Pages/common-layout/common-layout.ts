import { Component } from '@angular/core';
import { HeaderLayout } from '../../Layout/header-layout/header-layout';
import { SidebarLayout } from '../../Layout/sidebar-layout/sidebar-layout';
import { Dashboard } from '../../Components/dashboard/dashboard';
import { FooterLayout } from '../../Layout/footer-layout/footer-layout';

@Component({
  selector: 'app-common-layout',
  imports: [HeaderLayout, SidebarLayout, Dashboard, FooterLayout],
  templateUrl: './common-layout.html',
  styleUrl: './common-layout.scss',
})
export class CommonLayout {}

import { Component, OnInit } from '@angular/core';
import {InstallationBaseComponent} from "../installation/installation.base.component";
import {InstallationService} from "../common/services/installation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-installation-settings',
  templateUrl: './installation-settings.component.html',
  styleUrls: ['./installation-settings.component.scss']
})
export class InstallationSettingsComponent extends InstallationBaseComponent implements OnInit {

  constructor(installationService: InstallationService, route: ActivatedRoute) {
    super(installationService, route);
  }

}

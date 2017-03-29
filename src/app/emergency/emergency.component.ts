import { Component, OnInit } from '@angular/core';
import {InstallationBaseComponent} from "../installation/installation.base.component";
import {InstallationService} from "../common/services/installation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent extends InstallationBaseComponent implements OnInit {

  constructor(installationService: InstallationService, route: ActivatedRoute) {
    super(installationService, route);
  }

}

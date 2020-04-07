import { Component } from '@angular/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private navService: NavigationService) {}

 

}

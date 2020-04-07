import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  addItem = true;
  manual = false;
  scan = false;

  constructor() { }


  goAddItem(){
    this.addItem = true; 
    this.manual = false;
    this.scan = false;
  }
  
}

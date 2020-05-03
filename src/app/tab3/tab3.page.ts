import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Barcodes, FoodItem, GroceryItem } from '../../barcodes';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  groceryList: GroceryItem[];

  constructor(private dataService: DataserviceService) {
    this.dataService.getGroceryItems()
    .subscribe((data: GroceryItem[]) => {
      
      this.groceryList = data;
      
      
      console.log(this.groceryList);
      
    });
    
  }

  ionViewWillEnter(){
    this.dataService.getGroceryItems()
    .subscribe((data: GroceryItem[]) => {
      
      this.groceryList = data;
      
      
      console.log(this.groceryList);
      
    });
    
  }


}

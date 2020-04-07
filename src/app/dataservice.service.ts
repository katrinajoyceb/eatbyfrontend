import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { FoodItem } from '.././barcodes';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  foodItems: FoodItem[];
  foodList: FoodItem[];



  constructor(private http: HttpClient) { }

  getBarcodeDetails(){
    return this.http.get('assets/barcodes.json');
  }

  getFoodItems(){
    return this.http.get('assets/pantry.json');
  }

  addFoodItem(addItem){
    this.foodItems.push(addItem);

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { FoodItem, GroceryItem, TrendsItem } from '.././barcodes';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  foodItems: FoodItem[];
  foodList: FoodItem[];
  itemDetail: FoodItem;
  groceryList: GroceryItem[];

  // grocery = "http://192.168.9.8:8000/items/";
  // pantry = "http://192.168.9.8:8000/pantry/";
  // trends = "http://192.168.9.8:8000/trends/";
  // addGrocery = "http://192.168.9.8:8000/addGrocery/";
  // addPantry = "http://192.168.9.8:8000/addPantry/";
  // updatePantry = "http://192.168.9.8:8000/updatePantry/";
  // addTrends = "http://192.168.9.8:8000/addTrends/";

  grocery = "http://192.168.0.8:8000/items/";
  pantry = "http://192.168.0.8:8000/pantry/";
  trends = "http://192.168.0.8:8000/trends/";
  addGrocery = "http://192.168.0.8:8000/addGrocery/";
  addPantry = "http://192.168.0.8:8000/addPantry/";
  updatePantry = "http://192.168.0.8:8000/updatePantry/";
  addTrends = "http://192.168.0.8:8000/addTrends/";

  constructor(private http: HttpClient, public alertController: AlertController) { }

  getBarcodeDetails(){
    return this.http.get('assets/barcodes.json');
  }

  getTrends(){
    return this.http.get(this.trends);
  }

  getFoodItems(){
    return this.http.get(this.pantry);
  }

  getGroceryItems(){
    return this.http.get(this.grocery);
  }

  getMoneyLost(trends: TrendsItem[]){
    let lost = 0;

    let tossedItems = trends.filter(s => s.month != "May" && s.pantryStatus == 2 || s.pantryStatus == 3);

    for(let i = 0; i < tossedItems.length; i++){
      console.log(Number(tossedItems[i].price));
      lost += Number(tossedItems[i].price);
    }
    console.log(tossedItems);
    console.log(lost);

    return lost;
  }

  getMoneyLostNow(trends: TrendsItem[]){
    let lost = 0;
    
    let tossedItems = trends.filter(s => s.month === "May" && s.pantryStatus == 2);
    //let tossedItems = trends;

    for(let i = 0; i < tossedItems.length; i++){
      console.log(Number(tossedItems[i].price));
      lost += Number(tossedItems[i].price);
    }
    console.log(tossedItems);
    console.log(lost);

    return lost;
  }


  addFoodItem(item: FoodItem){
    this.http.post(`${this.addPantry}`, item)
      .subscribe(res => console.log('Added to Pantry'));
  }

  addGroceryItem(item: GroceryItem){
    this.http.post(`${this.addGrocery}`, item)
      .subscribe(res => console.log('Added to Grocery List'));
  }

  addTrendsItem(item: TrendsItem){
    this.http.post(`${this.addTrends}`, item)
      .subscribe(res => console.log('Added to Trends'));
  }


  updatePantryItem(item: FoodItem){
    let pk = item.pantryId;
    
    this.http.post(`${this.updatePantry}${pk}`, item)
    .subscribe(res => console.log('Updated Pantry Item'));
  }

  async presentAlertAddItem(item: FoodItem, next: string) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'You have added <strong>' + item.name +'</strong> to the Pantry.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            location.href = next;
          }
        }
      ]
    });

    await alert.present();
  }
}

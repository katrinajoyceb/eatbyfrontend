import { Component } from '@angular/core';

import { DataserviceService } from '../dataservice.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Barcodes, FoodItem } from '../../barcodes';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  foodItems: FoodItem[];
  foodList: FoodItem[];
  data: string;
  barcodeItems: Barcodes[];
  foundBarcode: FoodItem;
  addItem: FoodItem;
  stuff: string;


  constructor(private dataService: DataserviceService, private barcodeScanner: BarcodeScanner) {
    this.dataService.getFoodItems()
    .subscribe((data: FoodItem[]) => {
      
      this.foodList = data;
      this.dataService.foodItems = data;
      
      console.log(this.foodList);
      console.log(this.dataService.foodItems);
    });
    
  }

  ionViewWillEnter(){

    this.foodList = this.dataService.foodItems;
    console.log(this.foodList);

    this.dataService.getBarcodeDetails()
      .subscribe((data: Barcodes[]) => {
        this.barcodeItems = data;
      });
    

    // this.dataService.getFoodItems()
    // .subscribe((data: FoodItem[]) => {
      
    //   this.dataService.foodItems = data;
    //   this.foodItems = this.dataService.foodItems;
    //   console.log(this.foodItems);
    // });
    
  }

  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.data = barcodeData.text; //barcode
      this.foundBarcode = this.barcodeItems.find(s => s.code === this.data).items[0]; //item
      this.addItem = {
        name: this.foundBarcode.name,
        type: this.foundBarcode.type,
        expirationDate: this.foundBarcode.expirationDate,
        price: this.foundBarcode.price,
        status: 3
      };

      this.foodList.push(this.addItem);
      console.log('Barcode data', barcodeData.text);
      console.log(this.foundBarcode);
    
     }).catch(err => {
         console.log('Error', err);
     });
   

     
  }



}

import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Barcodes, FoodItem, TrendsItem } from '../../barcodes';
import { ModalController } from '@ionic/angular';
import { Tab3Page } from '../tab3/tab3.page'
import { AlertController } from '@ionic/angular';
import { ɵInternalFormsSharedModule } from '@angular/forms';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  foodList: FoodItem[];
  data: string;
  barcodeItems: Barcodes[];
  foundBarcode: FoodItem;
  foundReceipt: FoodItem[];
  addItem: FoodItem;
  details: boolean = false;
  itemDetails: FoodItem;
  pantryAmount: Number = 0;

  constructor(private dataService: DataserviceService, public alertController: AlertController, private barcodeScanner: BarcodeScanner, public modalController: ModalController) {
    this.dataService.getFoodItems()
    .subscribe((data: FoodItem[]) => {
      this.foodList = data;
      console.log(this.foodList); 
    });
  }

  ionViewWillEnter(){
    this.dataService.getFoodItems()
    .subscribe((data: FoodItem[]) => {
      this.foodList = data;
      console.log(this.foodList); 
    });
   
    console.log(this.foodList);

    this.dataService.getBarcodeDetails()
      .subscribe((data: Barcodes[]) => {
        this.barcodeItems = data;
    });

  }

  async presentAlertEaten(item: FoodItem) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to change the status of ' + item.name +' to <strong>Eaten</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            this.eaten(item)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertTossed(item: FoodItem) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to change the status of ' + item.name +' to <strong>Tossed?</strong>' + ' You will lose $'+ item.price + '.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Toss',
          handler: () => {
            this.tossed(item)
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertFrozen(item: FoodItem) {
    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: 'Are you sure you want to change the status of ' + item.name +' to <strong>Frozen?</strong> You cannot set it to Eaten until it is thawed.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Freeze',
          handler: () => {
            this.frozen(item)
          }
        }
      ]
    });

    await alert.present();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  scanBarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.data = barcodeData.text; //barcode
      this.foundBarcode = this.barcodeItems.find(s => s.code === this.data).items[0]; //item
      this.addItem = {
        pantryId: this.getRandomInt(100),
        name: this.foundBarcode.name,
        type: this.foundBarcode.type,
        expirationDate: this.foundBarcode.expirationDate,
        price: this.foundBarcode.price,
        expiredStatus: 3,
        pantryStatus: 0
      };

      this.dataService.addFoodItem(this.addItem);
      console.log('Barcode data', barcodeData.text);
      console.log(this.foundBarcode);

    }).catch(err => {
         console.log('Error', err);
    });
  }

  // scanReceipt(){ //make a receipt bro
  //   let receiptCode = '1234567890';
  //   this.foundReceipt = this.barcodeItems.find(s => s.code === receiptCode).items;
  //   console.log(this.foundReceipt);
  //   for(let i = 0; i < this.foundReceipt.length ; i++){

  //     let item = this.foundReceipt[i];
  //     this.addItem = {
  //       pantryId: this.getRandomInt(100),
  //       name: item.name,
  //       type: item.type,
  //       expirationDate: item.expirationDate,
  //       price: item.price,
  //       expiredStatus: 3,
  //       pantryStatus: 0
  //     };

  //     console.log(this.addItem);
  //     this.dataService.addFoodItem(this.addItem);
  //   }
  // }

  scanReceipt(){ //make a receipt bro
    this.barcodeScanner.scan().then(barcodeData => {
      let receiptCode = barcodeData.text;
      this.foundReceipt = this.barcodeItems.find(s => s.code === receiptCode).items;
      console.log(this.foundReceipt);

      for(let i = 0; i < this.foundReceipt.length ; i++){
        let item = this.foundReceipt[i];
        this.addItem = {
          pantryId: this.getRandomInt(100),
          name: item.name,
          type: item.type,
          expirationDate: item.expirationDate,
          price: item.price,
          expiredStatus: 3,
          pantryStatus: 0
        };
  
        console.log(this.addItem);
        this.dataService.addFoodItem(this.addItem);
      }

    }).catch(err => {
      console.log('Error', err);
    });
  }

  viewDetails(item: FoodItem){
    
    this.details = true;
    this.itemDetails = item;
  }

  goBack(){
    this.details = false;
  }

  eaten(item: FoodItem){
    let updateItem = item;
    updateItem.pantryStatus = 1;
    this.dataService.updatePantryItem(updateItem);
    let grocItem = {
      groceryId: this.getRandomInt(100),
      name: updateItem.name,
      type: updateItem.type,
      expirationDate: updateItem.expirationDate,
      price: updateItem.price,
      expiredStatus: updateItem.expiredStatus,
      pantryStatus:updateItem.pantryStatus
    }
    this.dataService.addGroceryItem(grocItem);
    let obj: TrendsItem = {
      name :  updateItem.name,
      month: "May",
      pantryStatus: updateItem.pantryStatus,
      expiredStatus: updateItem.expiredStatus,
      price: updateItem.price,
      type: updateItem.type,
    }
    this.dataService.addTrendsItem(obj);
    this.data
    this.details = false;
  }

  tossed(item: FoodItem){
    let updateItem = item;
    updateItem.pantryStatus = 2;
    this.dataService.updatePantryItem(updateItem);
    let grocItem = {
      groceryId: this.getRandomInt(100),
      name: updateItem.name,
      type: updateItem.type,
      expirationDate: updateItem.expirationDate,
      price: updateItem.price,
      expiredStatus: updateItem.expiredStatus,
      pantryStatus:updateItem.pantryStatus
    }
    this,this.dataService.addGroceryItem(grocItem);
    let obj: TrendsItem = {
      name :  updateItem.name,
      month: "May",
      pantryStatus: updateItem.pantryStatus,
      expiredStatus: updateItem.expiredStatus,
      price: updateItem.price,
      type: updateItem.type,
    }
    this.dataService.addTrendsItem(obj);
    this.details = false;
  }

  frozen(item: FoodItem){
    let updateItem = item;
    updateItem.pantryStatus = 3;
    updateItem.expiredStatus = 4;
    this.dataService.updatePantryItem(updateItem);
    this.details = false;
  }

  thaw(item: FoodItem){
    let updateItem = item;
    updateItem.pantryStatus = 0;
    updateItem.expiredStatus = 3;
    this.dataService.updatePantryItem(updateItem);
  }



}

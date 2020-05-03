import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Barcodes, FoodItem } from '../../barcodes';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  menu = true;
  manual = false;
  scan = false;
  data: string;
  barcodeItems: Barcodes[];
  foundBarcode: FoodItem;
  addItem: FoodItem;
  stuff: string;
  foodList: FoodItem[];
  private addItemForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private barcodeScanner: BarcodeScanner,
    private dataService: DataserviceService, public alertController: AlertController) {
    this.addItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [''],
      expirationDate: [''],
      price: [''],
    });
  }

  ionViewWillEnter(){
    this.menu = true;
    this.addItemForm.reset();
    this.foodList = this.dataService.foodItems;
    console.log(this.foodList);
    
    this.dataService.getBarcodeDetails()
      .subscribe((data: Barcodes[]) => {
        this.barcodeItems = data;
      });
  }
  
  async presentAlertAddItem(item: FoodItem) {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'You have added <strong>' + item.name +'</strong> to the Pantry.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            
          }
        }
      ]
    });

    await alert.present();
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  addToPantry(){
    console.log(this.addItemForm.value);
    this.addItem = {
      pantryId: this.getRandomInt(100),
      name: this.addItemForm.get('name').value,
      type: this.addItemForm.get('type').value,
      expirationDate: this.addItemForm.get('expirationDate').value,
      price: this.addItemForm.get('price').value,
      expiredStatus: 3,
      pantryStatus: 0
    };

    this.dataService.addFoodItem(this.addItem);
    console.log(this.foodList);
    this.presentAlertAddItem(this.addItem);
    this.addItemForm.reset();
  }
}

import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Barcodes, FoodItem } from '../../barcodes';


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
    private dataService: DataserviceService) {
    this.addItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [''],
      expirationDate: [''],
      price: [''],
    });

    

    // this.dataService.getBarcodeDetails()
    //   .subscribe((response)=> {
    //     this.items = response
    //     console.log(this.items);
    // });
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

  onChange(mode){

    this.dataService.getBarcodeDetails();

    this.menu = false;
    if(mode == 1){
      this.scan = true;
      console.log("scan")
    }
    else if(mode == 2){
      this.manual = true;
      console.log("manual")
    }
    

    console.log(mode);
  }

  onCancel(){
    this.menu= true;
    this.manual = false;
    this.scan = false;
  }


  addToPantry(){
    console.log(this.addItemForm.value);
    this.addItem = {
      name: this.addItemForm.get('name').value,
      type: this.addItemForm.get('type').value,
      expirationDate: this.addItemForm.get('expirationDate').value,
      price: this.addItemForm.get('price').value,
      status: 3
    };

    this.foodList.push(this.addItem);
    console.log(this.foodList);
    this.addItemForm.reset();
    
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { Barcodes, FoodItem, GroceryItem, TrendsItem } from '../../barcodes';
import { DataserviceService } from '../dataservice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('eatenChart', {static: false}) eatenChart;
  @ViewChild('tossedChart', {static: false}) tossedChart;
  @ViewChild('frozenChart', {static: false}) frozenChart;
  groceryList: GroceryItem[];
  trendsList: TrendsItem[];
  bars: any;
  colorArray: any;
  labels: String[] = [];
  dataSet: Number[] = [];
  eaten  = 0;
  tossed = 0;
  frozen = 0;
  moneyLostApril = 0;
  moneyLostNow = 0;
  eatenStats: any = {
    dairy: 0,
    meat: 0,
    poultry: 0,
    seafood: 0,
    eggs: 0,
    bakery: 0,
    vegetable: 0,
    fruit: 0
  }
  tossedStats: any = {
    dairy: 0,
    meat: 0,
    poultry: 0,
    seafood: 0,
    eggs: 0,
    bakery: 0,
    vegetable: 0,
    fruit: 0
  };
  frozenStats: any = {
    dairy: 0,
    meat: 0,
    poultry: 0,
    seafood: 0,
    eggs: 0,
    bakery: 0,
    vegetable: 0,
    fruit: 0
  };

  constructor(private dataService: DataserviceService) {
    this.dataService.getGroceryItems()
    .subscribe((data: GroceryItem[]) => {
      this.groceryList = data;
      console.log(this.groceryList);
    });

    
   }

  ngOnInit() {
    this.dataService.getTrends()
    .subscribe((data: TrendsItem[]) => {
      this.trendsList = data;
      console.log(this.trendsList);
    });
    
  }

  ionViewDidEnter() {
  
   this.getData();
   this.generateColorArray(8);
    this.createBarChart();
    this.createEatenChart();
    this.createTossedChart();
    this.createFrozenChart();
    
  }


  getData(){ 
    for(let i = 0; i < this.trendsList.length; i++){
      
      if(this.trendsList[i].pantryStatus == 1){
        this.eaten++;

        switch(this.trendsList[i].type){
          case 'Dairy':{
            this.eatenStats.dairy++;
            continue;
          }
          case 'Meat':{
            this.eatenStats.meat++;
            continue;
          }
          case 'Poultry':{
            this.eatenStats.poultry++;
            continue;
          }
          case 'Seafood':{
            this.eatenStats.seafood++;
            continue;
          }
          case 'Eggs':{
            this.eatenStats.eggs++;
            continue;
          }
          case 'Bakery':{
            this.eatenStats.bakery++;
            continue;
          }
          case 'Vegetable':{
            this.eatenStats.vegetable++;
            continue;
          }
          case 'Fruit':{
            this.eatenStats.fruit++;
            continue;
          }
        }

        

        // if(this.trendsList[i].type === 'Dairy'){
        //   stats.dairy++;
          
        // }
      }
      else if(this.trendsList[i].pantryStatus == 2){
        this.tossed++;

        switch(this.trendsList[i].type){
          case 'Dairy':{
            this.tossedStats.dairy++;
            continue;
          }
          case 'Meat':{
            this.tossedStats.meat++;
            continue;
          }
          case 'Poultry':{
            this.tossedStats.poultry++;
            continue;
          }
          case 'Seafood':{
            this.tossedStats.seafood++;
            continue;
          }
          case 'Eggs':{
            this.tossedStats.eggs++;
            continue;
          }
          case 'Bakery':{
            this.tossedStats.bakery++;
            continue;
          }
          case 'Vegetable':{
            this.tossedStats.vegetable++;
            continue;
          }
          case 'Fruit':{
            this.tossedStats.fruit++;
            continue;
          }
        }

      }
      else if(this.trendsList[i].pantryStatus == 3){
        this.frozen++;
        switch(this.trendsList[i].type){
          case 'Dairy':{
            this.frozenStats.dairy++;
            continue;
          }
          case 'Meat':{
            this.frozenStats.meat++;
            continue;
          }
          case 'Poultry':{
            this.frozenStats.poultry++;
            continue;
          }
          case 'Seafood':{
            this.frozenStats.seafood++;
            continue;
          }
          case 'Eggs':{
            this.frozenStats.eggs++;
            continue;
          }
          case 'Bakery':{
            this.frozenStats.bakery++;
            continue;
          }
          case 'Vegetable':{
            this.frozenStats.vegetable++;
            continue;
          }
          case 'Fruit':{
            this.frozenStats.fruit++;
            continue;
          }
        }

       
      }
      }

    console.log(this.eatenStats);    
    console.log(this.tossedStats);
    console.log(this.frozenStats);

    
  }


  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }

  createBarChart() {
    this.moneyLostApril = this.dataService.getMoneyLost(this.trendsList);
    this.moneyLostNow = this.dataService.getMoneyLostNow(this.trendsList);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Eaten', 'Tossed', 'Frozen'],
        datasets: [{
          label: 'Stats for April',
          data: [this.eaten, this.tossed, this.frozen],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createEatenChart() {
    
      this.bars = new Chart(this.eatenChart.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Dairy', 'Meat', 'Poultry', 'Seafood', 'Eggs', 'Bakery', 'Vegetable', 'Fruit'],
          datasets: [{
            label: 'Categories: Eaten',
            data: [this.eatenStats.dairy, this.eatenStats.meat, this.eatenStats.poultry, this.eatenStats.seafood, this.eatenStats.eggs, this.eatenStats.bakery, this.eatenStats.vegetable, this.eatenStats.fruit],
            backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
            borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
            borderWidth: 0
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    
  }

  createTossedChart(){
    this.bars = new Chart(this.tossedChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Dairy', 'Meat', 'Poultry', 'Seafood', 'Eggs', 'Bakery', 'Vegetable', 'Fruit'],
        datasets: [{
          label: 'Categories: Tossed',
          data: [this.tossedStats.dairy, this.tossedStats.meat, this.tossedStats.poultry, this.tossedStats.seafood, this.tossedStats.eggs, this.tossedStats.bakery, this.tossedStats.vegetable, this.tossedStats.fruit],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  
  }


  createFrozenChart(){
    this.bars = new Chart(this.frozenChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Dairy', 'Meat', 'Poultry', 'Seafood', 'Eggs', 'Bakery', 'Vegetable', 'Fruit'],
        datasets: [{
          label: 'Categories: Frozen',
          data: [this.frozenStats.dairy, this.frozenStats.meat, this.frozenStats.poultry, this.frozenStats.seafood, this.frozenStats.eggs, this.frozenStats.bakery, this.frozenStats.vegetable, this.frozenStats.fruit],
          backgroundColor: this.colorArray, // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 0
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

    addTrends(){ //make a receipt bro
    
     for(let i = 0; i < this.trendsList.length ; i++){

       let item = this.trendsList[i];
       let trendItem = {
         name: item.name,
         type: item.type,
        price: item.price,
         expiredStatus: item.expiredStatus,
         pantryStatus: item.pantryStatus,
         month: item.month
       };
       
       this.dataService.addTrendsItem(trendItem);
     }
   }

}

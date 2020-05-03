import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { FoodItem } from 'src/barcodes';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.scss'],
})
export class ItemdetailComponent implements OnInit {

  itemDetail: FoodItem;

  constructor(private dataService: DataserviceService) { 
    this.itemDetail = this.dataService.itemDetail;
  }

  ngOnInit() {
    console.log(this.itemDetail);
  }



}

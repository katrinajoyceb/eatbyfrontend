import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivefeedPageRoutingModule } from './livefeed-routing.module';

import { LivefeedPage } from './livefeed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivefeedPageRoutingModule
  ],
  declarations: [LivefeedPage]
})
export class LivefeedPageModule {}

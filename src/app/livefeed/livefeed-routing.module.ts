import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivefeedPage } from './livefeed.page';

const routes: Routes = [
  {
    path: '',
    component: LivefeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivefeedPageRoutingModule {}

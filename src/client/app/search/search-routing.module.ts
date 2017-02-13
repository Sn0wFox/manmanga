import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';

import { searchRouterConfig } from './search.routes';

@NgModule({
  imports: [
    RouterModule.forChild(searchRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule {
  // Nothing else to do
}

import { NgModule }             from '@angular/core';
import { RouterModule }         from '@angular/router';

import { responseRouterConfig } from './response.routes';

@NgModule({
  imports: [
    RouterModule.forChild(responseRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class ResponseRoutingModule {
  // Nothing else to do
}

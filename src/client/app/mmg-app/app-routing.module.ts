import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { rootRouterConfig } from './app.routes';

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  // Nothing else to do
}

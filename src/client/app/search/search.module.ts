import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';

import { ResponseModule }       from '../response/response.module';
import { SearchPageComponent }  from './search-page/search-page.component';
import { SearchBarComponent }   from './search-bar/search-bar.component';
import { SearchRoutingModule }  from './search-routing.module';
import { ApiService }           from './services/api.service';

@NgModule({
  imports: [
    SearchRoutingModule,
    ResponseModule,
    CommonModule
  ],
  providers: [
    ApiService
  ],
  declarations: [
    SearchBarComponent,
    SearchPageComponent
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchModule {
  // Nothing else to do
}

import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ResponseModule} from "../response/response.module";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {SearchRoutingModule} from "./search-routing.module";
import {ApiService} from "./services/api.service";

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
    SearchBarComponent
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchModule {
}

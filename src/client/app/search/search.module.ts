import {NgModule} from "@angular/core";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {SearchRoutingModule} from "./search-routing.module";
import {ApiService} from "./services/api.service";

@NgModule({
  imports: [
    SearchRoutingModule
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

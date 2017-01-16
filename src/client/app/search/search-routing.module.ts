import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SearchBarComponent} from "./search-bar/search-bar.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: "search", component: SearchBarComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SearchRoutingModule {
}

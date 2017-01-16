import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AnimeComponent} from "./anime-response/anime-response.component";
import {AuthorComponent} from "./author-response/author-response.component";
import {MangaComponent} from "./manga-response/manga-response.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: "anime", component: AnimeComponent},
      {path: "author", component: AuthorComponent},
      {path: "manga", component: MangaComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ResponseRoutingModule {
}

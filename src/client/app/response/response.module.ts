import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';
import { AnimeComponent }   from './anime-response/anime-response.component';
import { AuthorComponent }  from './author-response/author-response.component';
import { MangaComponent }   from './manga-response/manga-response.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AnimeComponent,
    AuthorComponent,
    MangaComponent
  ],
  exports: [
    AnimeComponent,
    AuthorComponent,
    MangaComponent
  ]
})
export class ResponseModule {
}

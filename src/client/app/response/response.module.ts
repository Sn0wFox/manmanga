import { CommonModule } from '@angular/common';
import { NgModule }     from '@angular/core';

import { ResponsePageComponent }  from './response-page/response-page.component';
import { AnimeComponent }         from './anime-response/anime-response.component';
import { AuthorComponent }        from './author-response/author-response.component';
import { MangaComponent }         from './manga-response/manga-response.component';
import { ResponseRoutingModule }  from './response-routing.module';

import { ReadableResourcePipe }   from './pipes/readable-resource.pipe';
import { TruncatePipe }           from './pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    ResponseRoutingModule
  ],
  declarations: [
    ResponsePageComponent,
    AnimeComponent,
    AuthorComponent,
    MangaComponent,
    ReadableResourcePipe,
    TruncatePipe
  ],
  exports: [
    // Components here may be used in another module
    AnimeComponent,
    AuthorComponent,
    MangaComponent
  ]
})
export class ResponseModule {
  // Nothing else to do
}

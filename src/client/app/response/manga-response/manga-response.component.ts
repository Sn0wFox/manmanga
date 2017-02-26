import { Component, Input } from '@angular/core';
import { OnInit }           from '@angular/core';

import { Manga }  from '../../../../lib/interfaces/manga.interface';

declare let $: JQueryStatic;

// const MANGATEST: Manga = {
//   title: 'Death Note',
//   author: {name: 'Tsugumi Oba'},
//   illustrator: ['Takeshi Obata'],
//   volumes: 12,
//   genres: ['Thriller', 'Drama'],
//   abstract: 'Kira kill the world with a book from hell',
//   coverUrl: 'http://mcd.iosphe.re/n/41/1/front/a/'
// };

@Component({
  selector: 'mmg-manga-response',
  templateUrl: 'manga-response.component.pug',
  styleUrls: ['manga-response.component.scss']
})
export class MangaComponent implements OnInit {
  @Input()
  manga: Manga;

  public ngOnInit(): void {
    $('.tooltipped').tooltip({
      delay: 50,
      position: 'top'
    });
  }
}

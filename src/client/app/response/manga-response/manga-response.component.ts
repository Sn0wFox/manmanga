import { Component, OnInit, Input } from '@angular/core';

import { Manga }  from '../../../../lib/interfaces/manga.interface';

const MANGATEST: Manga = {
  title: 'Death Note',
  author: {name: 'Tsugumi Oba'},
  illustrator: ['Takeshi Obata'],
  volumes: 12,
  genres: ['Thriller', 'Drama'],
  abstract: 'Kira kill the world with a book from hell',
  coverUrl: 'http://mcd.iosphe.re/n/41/1/front/a/'
};

@Component({
  selector: 'mmg-manga-response',
  templateUrl: 'manga-response.component.pug',
  styleUrls: ['manga-response.component.scss']
})
export class MangaComponent implements OnInit {
  @Input() manga: Manga;

  constructor() {}

  ngOnInit(): void {
    // // console.log('Manga !');
  }
  setManga(manga: Manga): void {
    this.manga = manga;
  }
}

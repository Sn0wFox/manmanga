import { Component, Input } from '@angular/core';
import { AfterViewInit }    from '@angular/core';
import { Renderer }         from '@angular/core';
import { ViewChildren }     from '@angular/core';
import { QueryList }        from '@angular/core';
import { ElementRef }       from '@angular/core';

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
export class MangaComponent implements AfterViewInit {
  /**
   * The manga to display.
   */
  @Input()
  protected manga: Manga;

  /**
   * The list of tooltiped buttons.
   */
  @ViewChildren('tooltipped')
  protected tooltipables: QueryList<ElementRef>;

  /**
   * Properly initializes tooltips.
   */
  public ngAfterViewInit(): void {
    this.tooltipables.forEach((child: ElementRef) => {
      this.renderer.invokeElementMethod($(child.nativeElement), 'tooltip', [{
        delay: 50,
        position: 'top'
      }]);
    });
  }

  /**
   * Instantiates component and injects needed services.
   */
  public constructor(private renderer: Renderer) {
    // Nothing else to do
  }
}

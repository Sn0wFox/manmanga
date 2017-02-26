import { Component, Input } from '@angular/core';
import { AfterViewInit }    from '@angular/core';
import { Renderer }         from '@angular/core';
import { ViewChildren }     from '@angular/core';
import { QueryList }        from '@angular/core';
import { ElementRef }       from '@angular/core';

import { Anime }  from '../../../../lib/interfaces/anime.interface';

declare let $: JQueryStatic;

@Component({
  selector: 'mmg-anime-response',
  templateUrl: 'anime-response.component.pug',
  styleUrls: ['anime-response.component.scss']
})
export class AnimeComponent implements AfterViewInit {
  /**
   * The anime to display.
   */
  @Input()
  anime: Anime;

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

import { Component }      from '@angular/core';
import { ViewChild }      from '@angular/core';
import { ElementRef }     from '@angular/core';
import { Renderer }       from '@angular/core';
import { OnInit }         from '@angular/core';
import { AfterViewInit }  from '@angular/core';

import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'mmg-navbar',
  templateUrl: 'navbar.component.pug',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  /**
   * A reference to the side navigation,
   * gathered by Angular.
   */
  @ViewChild('menu')
  protected menuRef: ElementRef;

  /**
   * Whether or not the search-bar must be shown.
   */
  protected showSearchBar: boolean = true;

  /**
   * Properly initialize component.
   * Set a handler for SEARCH_COMPLETE event.
   */
  public ngOnInit(): void {
    this.emitterService.on(this.emitterService.events.SEARCH_COMPLETE, () => {
      this.showSearchBar = true;
    });
  }

  /**
   * Enables the side navigation.
   */
  public ngAfterViewInit(): void {
    this.renderer.invokeElementMethod($(this.menuRef.nativeElement), 'sideNav',
      [{edge: 'right', closeOnClick: true}]);
  }

  /**
   * Construct the component and injects needed services.
   */
  public constructor(
    private renderer: Renderer,
    private emitterService: EmitterService) {
    // Nothing else to do
  }
}

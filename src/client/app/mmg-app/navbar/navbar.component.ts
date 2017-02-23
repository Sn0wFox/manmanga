import 'rxjs/add/operator/filter';
import { Component }      from '@angular/core';
import { ViewChild }      from '@angular/core';
import { ElementRef }     from '@angular/core';
import { Renderer }       from '@angular/core';
import { OnInit }         from '@angular/core';
import { AfterViewInit }  from '@angular/core';
import { NavigationEnd }  from '@angular/router';
import { Router }         from '@angular/router';
import { Event }          from '@angular/router';

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
  protected showSearchBar: boolean = false;

  /**
   * Properly initialize component.
   * Set a handler for SEARCH_WANTED event.
   */
  public ngOnInit(): void {
    // this.route.url.subscribe((segments: UrlSegment[]) => {
    //   this.url = segments.join('');
    //   console.log("URL CHANGED:");
    //   console.log(this.url);
    // });
    this.router.events
      .filter((event: Event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.showSearchBar = event.urlAfterRedirects.match(/^\/search/) != null;
        // TODO: fill search bar with search query
      });
    this.emitterService.on(this.emitterService.events.SEARCH_WANTED, (query: string) => {
      this.router.navigate(['/search', query]);
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
    private emitterService: EmitterService,
    private router: Router) {
    // Nothing else to do
  }
}

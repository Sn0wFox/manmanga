import { Component }      from '@angular/core';
import { ViewChild }      from '@angular/core';
import { ElementRef }     from '@angular/core';
import { Renderer }       from '@angular/core';
import { AfterViewInit }  from '@angular/core';

@Component({
  selector: 'mmg-navbar',
  templateUrl: 'navbar.component.pug',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
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
   * Enables the side navigation.
   */
  public ngAfterViewInit(): void {
    this.renderer.invokeElementMethod($(this.menuRef.nativeElement), 'sideNav',
      [{edge: 'right', closeOnClick: true}]);
  }

  /**
   * Construct the component and injects services.
   */
  public constructor(private renderer: Renderer) {
    // Nothing else to do
  }
}

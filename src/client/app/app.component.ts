import { Component, Type }  from '@angular/core';
import { ViewChild }        from '@angular/core';
import { AfterViewInit }    from '@angular/core';
import { ElementRef }       from '@angular/core';
import { Renderer }         from '@angular/core';

import { AbstractModal }    from './modal/modal.abstract';
import { AwModalComponent } from './modal/alpha-welcome-modal/aw-modal.component';

declare let $: JQueryStatic;

@Component({
  selector: 'mmg-app',
  templateUrl: 'app.component.pug',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {

  /**
   * A reference to the side navigation,
   * gathered by Angular.
   */
  @ViewChild('menu')
  protected menuRef: ElementRef;

  /**
   * The type of the modal to open on loading.
   * @type {AwModalComponent}
   */
  private modalType: Type<AbstractModal> = AwModalComponent;

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

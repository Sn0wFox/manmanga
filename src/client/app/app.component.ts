import { Component, Type }  from '@angular/core';

import { AbstractModal }    from './modal/modal.abstract';
import { AwModalComponent } from './modal/alpha-welcome-modal/aw-modal.component';

@Component({
  selector: 'mmg-app',
  templateUrl: 'app.component.pug',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  /**
   * The type of the modal to open on loading.
   * @type {AwModalComponent}
   */
  private modalType: Type<AbstractModal> = AwModalComponent;
}

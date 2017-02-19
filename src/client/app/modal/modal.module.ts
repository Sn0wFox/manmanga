import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ModalComponent }   from './modal.component';
import { AwModalComponent } from './alpha-welcome-modal/aw-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ModalComponent,
    AwModalComponent
  ],
  exports: [
    ModalComponent,
    AwModalComponent
  ],
  entryComponents: [
    AwModalComponent
  ]
})
export class ModalModule {
  // Nothing else to do
}

// Angular2 native modules
import { NgModule }       from '@angular/core'
import { FormsModule }    from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';

// Angular2 custom modules
import { AppRoutingModule } from './app-routing.module';
import { SearchModule }     from '../search/search.module';
import { ModalModule }      from '../modal/modal.module';

// Components for this module
import { AppComponent }     from './app.component';
import { NavbarComponent }  from './navbar/navbar.component';

// Services for this module
import { EmitterService }   from './services/emitter.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  providers: [
    EmitterService
  ],
  imports: [
    // NOTES: Lazily loaded modules don't need to appear here
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule,
    SearchModule      // Eagerly loaded (on start) because default module to show
  ],
  exports: [
    AppRoutingModule,
    NavbarComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Nothing else to do
}

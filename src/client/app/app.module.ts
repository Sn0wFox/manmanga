// Angular2 native modules
import { NgModule }           from '@angular/core'
import { FormsModule,
        ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }      from '@angular/platform-browser';
import { HttpModule }         from '@angular/http';

// Angular2 custom modules
import { ResponseModule }   from './response/response.module';
import { AppRoutingModule } from './app-routing.module';

// Components for this module
import { AppComponent }     from './app.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent
  ],
  imports: [
    // NOTE: Dynamically loaded modules don't need to appear here
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ResponseModule
  ],
  exports: [
    ResponseModule,
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Nothing else to do
}

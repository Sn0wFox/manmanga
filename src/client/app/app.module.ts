// Angular2 native modules
import { NgModule }       from '@angular/core'
import { FormsModule }    from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';

// Angular2 custom modules
import { AppRoutingModule } from './app-routing.module';

// Components for this module
import { AppComponent }     from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // NOTE: Dynamically loaded modules don't need to appear here
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Nothing else to do
}

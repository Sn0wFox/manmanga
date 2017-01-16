// Angular2 nativ modules
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// Angular2 custom modules
import {AboutModule} from './about/about.module';
import {HomeModule} from './home/home.module';
import {ResponseModule} from './response/response.module';
import {SearchModule} from './search/search.module';
import {AppRoutingModule} from './app-routing.module';

// Components for this module
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HomeModule,
    AboutModule,
    SearchModule,
    ResponseModule,
    AppRoutingModule
  ],
  exports: [
    HomeModule,
    AboutModule,
    SearchModule,
    ResponseModule,
    AppRoutingModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

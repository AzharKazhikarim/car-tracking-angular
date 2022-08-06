import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapServiceService } from './services/map-service.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CarCardComponent } from './components/car-card/car-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    CarCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule,
  ],
  providers: [MapServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

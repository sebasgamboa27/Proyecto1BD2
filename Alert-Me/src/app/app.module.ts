import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { WalkingPageComponent } from './home/walking-page/walking-page.component';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './home/walking-page/map/map.component';
import { AgmCoreModule } from '@agm/core'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WalkingPageComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC9_rLlv75KYZPqA5YXnSeB0i3UaaQ_61w'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

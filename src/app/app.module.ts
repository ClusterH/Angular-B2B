import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  MatTabsModule
} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MdePopoverModule } from '@material-extended/mde';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { Ng5SliderModule } from 'ng5-slider';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';
import { AboutComponent } from './modules/general/about/about.component';
import { SigninComponent } from './modules/general/signin/signin.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './modules/general/search/search.component';
import { ArtboardComponent } from './modules/general/artboard/artboard.component';
import { SuccessComponent } from './modules/general/success/success.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SeatComponent } from './modules/general/seat/seat.component';

import {Globals} from './globals';
import { PreviewComponent } from './modules/general/preview/preview.component'

import { Ng2CompleterModule } from "ng2-completer";
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const MaterialModules = [
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  FormsModule,
  MatDatepickerModule,
  MatMomentDateModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SigninComponent,
    NotFoundComponent,
    SearchComponent,
    ArtboardComponent,
    SuccessComponent,
    SeatComponent,
    PreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ...MaterialModules,
    MdePopoverModule,
    Ng5SliderModule,
    Ng2CompleterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports: [],
  providers: [Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }

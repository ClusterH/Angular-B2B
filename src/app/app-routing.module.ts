import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './modules/general/about/about.component';
import { HomeComponent } from './modules/general/home/home.component';
import { SigninComponent } from './modules/general/signin/signin.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { SearchComponent } from './modules/general/search/search.component';
import { ArtboardComponent } from './modules/general/artboard/artboard.component';
import { SuccessComponent } from './modules/general/success/success.component';
import { SeatComponent } from './modules/general/seat/seat.component';
import { PreviewComponent } from './modules/general/preview/preview.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'about', component: AboutComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'search', component: SearchComponent },
  { path: 'artboard', component: ArtboardComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'seat', component: SeatComponent },
  { path: 'preview', component: PreviewComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

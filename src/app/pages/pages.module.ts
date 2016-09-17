import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from '@angular/http';
import {TranslateModule} from 'ng2-translate/ng2-translate';
import { Pages } from './pages.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot(),
    routing
  ],
  declarations: [Pages]
})
export class PagesModule {
}

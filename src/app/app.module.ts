import { NgModule, ApplicationRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

//import {TreeComponent, TreeModel} from 'ng2-tree';
import {BaProfilePicturePipe, BaAppPicturePipe} from './theme/pipes';
import { CKEditorComponent } from 'ng2-ckeditor';
import {StandardInputs} from './pages/forms/components/inputs/components/standardInputs';
import {ValidationInputs} from './pages/forms/components/inputs/components/validationInputs';
import {GroupInputs} from './pages/forms/components/inputs/components/groupInputs';
import {CheckboxInputs} from './pages/forms/components/inputs/components/checkboxInputs';
import {Rating} from './pages/forms/components/inputs/components/ratinginputs';

import {InlineForm} from './pages/forms/components/layouts/components/inlineForm';
import {BlockForm} from './pages/forms/components/layouts/components/blockForm';
import {HorizontalForm} from './pages/forms/components/layouts/components/horizontalForm';
import {BasicForm} from './pages/forms/components/layouts/components/basicForm';
import {WithoutLabelsForm} from './pages/forms/components/layouts/components/withoutLabelsForm';


import {HoverTable} from './pages/tables/components/basicTables/components/hoverTable';
import {BorderedTable} from './pages/tables/components/basicTables/components/borderedTable';
import {CondensedTable} from './pages/tables/components/basicTables/components/condensedTable';
import {StripedTable} from './pages/tables/components/basicTables/components/stripedTable';
import {ContextualTable} from './pages/tables/components/basicTables/components/contextualTable';
import {ResponsiveTable} from './pages/tables/components/basicTables/components/responsiveTable';
import {NG2_SMART_TABLE_DIRECTIVES} from 'ng2-smart-table';

import {FlatButtons} from './pages/ui/components/buttons/components/flatButtons';
import {RaisedButtons} from './pages/ui/components/buttons/components/raisedButtons';
import {SizedButtons} from './pages/ui/components/buttons/components/sizedButtons';
import {DisabledButtons} from './pages/ui/components/buttons/components/disabledButtons';
import {IconButtons} from './pages/ui/components/buttons/components/iconButtons';
import {LargeButtons} from './pages/ui/components/buttons/components/largeButtons';
import {DropdownButtons} from './pages/ui/components/buttons/components/dropdownButtons';
import {GroupButtons} from './pages/ui/components/buttons/components/groupButtons';

import {BaCardBlur} from './theme/components/baCard/baCardBlur.directive';
import {BaSlimScroll} from './theme/directives/baSlimScroll';
import {BaScrollPosition} from './theme/directives/baScrollPosition';



import {BaCheckbox} from './theme/components/baCheckbox';
import {BaMenuItem} from './theme/components/baMenu/components/baMenuItem';
import {BaMsgCenter} from './theme/components/baMsgCenter';
import {BaMenu} from './theme/components/baMenu';

/*
 * Platform and Environment providers/directives/pipes
 * https://angular.io/docs/ts/latest/api/core/index/NgModule-interface.html
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [
    App,
    BaCardBlur,
    BaMenuItem,
    BaSlimScroll,
    BaProfilePicturePipe,
    CKEditorComponent,
    BaCheckbox,
    BaMenu,
    HoverTable, BorderedTable, CondensedTable, StripedTable, ContextualTable, ResponsiveTable,
    NG2_SMART_TABLE_DIRECTIVES,
    FlatButtons, RaisedButtons, SizedButtons, DisabledButtons, IconButtons, LargeButtons, DropdownButtons, GroupButtons,
    BaMsgCenter, BaScrollPosition
  ],

  declarations: [
    App,
    BaCardBlur,
    BaMenuItem,
    BaSlimScroll,
    BaProfilePicturePipe,
    CKEditorComponent,
    BaCheckbox,
    BaMenu,
    HoverTable, BorderedTable, CondensedTable, StripedTable, ContextualTable, ResponsiveTable,
    NG2_SMART_TABLE_DIRECTIVES,
    FlatButtons, RaisedButtons, SizedButtons, DisabledButtons, IconButtons, LargeButtons, DropdownButtons, GroupButtons,
    BaMsgCenter, BaScrollPosition
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    PagesModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {

  }

  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}

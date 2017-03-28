import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit_category/edit.category.component';
import { ListCategoriesComponent } from './components/list_categories/list_categories.component';

import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { FetchService } from './services/fetch.service';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import {Ng2UiAuthModule} from 'ng2-ui-auth';
import {AuthConfig} from './config/oauth.config';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './stores';
import { UserEffects } from './stores/user/user.effects';
import { CategoryEffects } from './stores/categories/categories.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HomeGuard } from './components/home/home.guard';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [ 
  CategoryService,
  FetchService     
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    CategoryComponent,
    EditCategoryComponent,
    ListCategoriesComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    Ng2UiAuthModule.forRoot(AuthConfig),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({maxAge:10}),
    EffectsModule.run(UserEffects),
    EffectsModule.run(CategoryEffects)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    HomeGuard
  ]
})
export class AppModule {
  constructor( public appRef: ApplicationRef) {}
}

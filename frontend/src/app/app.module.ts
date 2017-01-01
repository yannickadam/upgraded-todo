import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit_category/edit.category.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { FetchService } from './services/fetch.service';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";

import {Ng2UiAuthModule} from 'ng2-ui-auth';
import {AuthConfig} from './config/oauth.config';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,  
    CategoryComponent,
    EditCategoryComponent,
    AppComponent,
    HeaderComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    FormsModule,
    Ng2UiAuthModule.forRoot(AuthConfig)
  ],
  providers: [
    CategoryService,
    UserService,
    FetchService   
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}

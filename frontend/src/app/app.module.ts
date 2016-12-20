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
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ConfigurationService } from './services/config.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { FetchService } from './services/fetch.service';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,    
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    FormsModule
  ],
  providers: [
    ConfigurationService,
    CategoryService,
    UserService,
    FetchService   
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}

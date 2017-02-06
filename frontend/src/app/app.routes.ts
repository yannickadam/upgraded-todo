import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { CategoryComponent } from './components/category/category.component';
import { EditCategoryComponent } from './components/edit_category/edit.category.component';

import { HomeGuard } from './components/home/home.guard';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'main', component: MainComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'new_category', component: EditCategoryComponent },
  { path: '**',    component: HomeComponent }
];

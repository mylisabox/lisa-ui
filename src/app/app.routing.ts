import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {PluginsComponent} from "./pages/plugins/plugins.component";
import {ScenesComponent} from "./pages/scenes/scenes.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {NotificationComponent} from "./pages/notification/notification.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'plugins', component: PluginsComponent},
  {path: 'scenes', component: ScenesComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'notifications', component: NotificationComponent},
  {path: 'home', component: HomeComponent},
  {path: '', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

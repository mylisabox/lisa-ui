import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {PluginsComponent} from "./pages/plugins/plugins.component";
import {ScenesComponent} from "./pages/scenes/scenes.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {NotificationComponent} from "./pages/notification/notification.component";
import {AuthGuard} from "./common/auth.guard";
import {ScenesFormComponent} from "./pages/scenes/form/scenes-form.component";
import {ScenesListComponent} from "./pages/scenes/list/scenes-list.component";

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'plugins', component: PluginsComponent, canActivate: [AuthGuard]},
  {
    path: 'scenes', component: ScenesComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {path: 'form', component: ScenesFormComponent},
          {path: 'list', component: ScenesListComponent},
          {path: '', component: ScenesListComponent}
        ]
      }
    ]
  },
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

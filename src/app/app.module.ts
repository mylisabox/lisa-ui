import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ProfileComponent} from './pages/profile/profile.component'
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders}  from './app.routing';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {ScenesComponent} from './pages/scenes/scenes.component';
import {PluginsComponent} from './pages/plugins/plugins.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AlertModule, ButtonsModule, DatepickerModule, CollapseModule} from 'ng2-bootstrap/ng2-bootstrap';
import { ShopComponent } from './pages/shop/shop.component';
import { NotificationComponent } from './pages/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SettingsComponent,
    ScenesComponent,
    PluginsComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    PageNotFoundComponent,
    ShopComponent,
    NotificationComponent
  ],
  imports: [
    routing,
    AlertModule,
    DatepickerModule,
    CollapseModule,
    ButtonsModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}

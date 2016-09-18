import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ProfileComponent} from './pages/profile/profile.component'
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {routing, appRoutingProviders}  from './app.routing';
import {HttpModule, Http} from '@angular/http';
import {AuthGuard} from './common/auth.guard';
import {AuthService} from './services/auth.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {ScenesComponent} from './pages/scenes/scenes.component';
import {PluginsComponent} from './pages/plugins/plugins.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AlertModule, ButtonsModule, DatepickerModule, CollapseModule} from 'ng2-bootstrap/ng2-bootstrap';
import {ShopComponent} from './pages/shop/shop.component';
import {NotificationComponent} from './pages/notification/notification.component';
import {WidgetComponent} from './components/widget/widget.component';
import {BaseElementComponent} from './components/widget/base-element/base-element.component';
import {VboxComponent} from './components/widget/vbox/vbox.component';
import {HboxComponent} from './components/widget/hbox/hbox.component';
import {CardComponent} from './components/widget/card/card.component';
import {ToggleButtonComponent} from './components/widget/toggle-button/toggle-button.component';
import {ButtonComponent} from './components/widget/button/button.component';
import {ImageComponent} from './components/widget/image/image.component';
import {ColorPickerComponent} from './components/widget/color-picker/color-picker.component';
import {ImageButtonComponent} from './components/widget/image-button/image-button.component';
import {CameraComponent} from './components/widget/camera/camera.component';
import {SliderComponent} from './components/widget/slider/slider.component';
import {LoginBoxComponent} from './pages/login/login-box/login-box.component';
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {contentHeaders} from "./common/headers";
import {Globals} from "./common/globals";

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
    NotificationComponent,
    WidgetComponent,
    BaseElementComponent,
    VboxComponent,
    HboxComponent,
    CardComponent,
    ToggleButtonComponent,
    ButtonComponent,
    ImageComponent,
    ColorPickerComponent,
    ImageButtonComponent,
    CameraComponent,
    SliderComponent,
    LoginBoxComponent
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
  providers: [appRoutingProviders, {
    provide: AuthHttp,
    useFactory: (http: Http) => {
      const config: AuthConfig = new AuthConfig({
        noJwtError: true,
        tokenName: Globals.tokenKey,
        headerPrefix: 'JWT ',
        globalHeaders: [contentHeaders.toJSON()]
      });
      return new AuthHttp(config, http);
    },
    deps: [Http]
  }, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

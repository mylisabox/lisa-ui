import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ColorPickerModule} from "angular2-color-picker";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {routing, appRoutingProviders} from "./app.routing";
import {HttpModule} from "@angular/http";
import {AuthGuard, provideAuthGuard} from "./common/auth.guard";
import {AuthService} from "./services/auth.service";
import {RoomService} from "./services/room.service";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {ScenesComponent} from "./pages/scenes/scenes.component";
import {PluginsComponent} from "./pages/plugins/plugins.component";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {AlertModule, ButtonsModule, DatepickerModule, CollapseModule, ModalModule} from "ng2-bootstrap/ng2-bootstrap";
import {Ng2DashboardModule} from "ng2-dashboard";
import {ShopComponent} from "./pages/shop/shop.component";
import {NotificationComponent} from "./pages/notification/notification.component";
import {WidgetLISAComponent} from "./components/widget/widget.component";
import {BaseElementComponent} from "./components/widget/base-element/base-element.component";
import {VboxComponent} from "./components/widget/vbox/vbox.component";
import {HboxComponent} from "./components/widget/hbox/hbox.component";
import {CardComponent} from "./components/widget/card/card.component";
import {ToggleButtonComponent} from "./components/widget/toggle-button/toggle-button.component";
import {ButtonComponent} from "./components/widget/button/button.component";
import {ImageComponent} from "./components/widget/image/image.component";
import {ColorPickerComponent} from "./components/widget/color-picker/color-picker.component";
import {ImageButtonComponent} from "./components/widget/image-button/image-button.component";
import {CameraComponent} from "./components/widget/camera/camera.component";
import {SliderComponent} from "./components/widget/slider/slider.component";
import {LoginBoxComponent} from "./pages/login/login-box/login-box.component";
import {NotificationService} from "./services/notification.service";
import {WebsocketService} from "./interfaces/websocket-service";
import {BROWSER_WEBSOCKET_PROVIDERS} from "./services/websocket-front.service";
import {NotificationManagerComponent} from "./components/notification-manager/notification-manager.component";
import {FocusDirective} from "./directives/focus.directive";
import {ConfirmModalComponent} from "./components/modals/confirm-modal/confirm-modal.component";
import {WidgetHeaderComponent} from "./components/widget/widget-header/widget-header.component";
import {WidgetContentComponent} from "./components/widget/widget-content/widget-content.component";
import {DeviceService} from "./services/device.service";
import {FavoriteService} from "./services/favorite.service";
import {SpaceComponent} from "./components/widget/space/space.component";

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
    WidgetLISAComponent,
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
    LoginBoxComponent,
    NotificationManagerComponent,
    FocusDirective,
    ConfirmModalComponent,
    WidgetHeaderComponent,
    WidgetContentComponent,
    SpaceComponent
  ],
  entryComponents: [
    WidgetLISAComponent
  ],
  imports: [
    AlertModule,
    ModalModule,
    ColorPickerModule,
    Ng2DashboardModule,
    DatepickerModule,
    CollapseModule,
    ButtonsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    provideAuthGuard,
    AuthGuard,
    RoomService,
    DeviceService,
    FavoriteService,
    AuthService,
    WebsocketService,
    NotificationService,
    BROWSER_WEBSOCKET_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {ColorPickerModule} from "ngx-color-picker";
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {appRoutingProviders, routing} from "./app.routing";
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
import {AccordionModule, AlertModule, CollapseModule, ModalModule} from "ngx-bootstrap";
import {NgDashboardModule} from "ngx-dashboard";
import {ShopComponent} from "./pages/shop/shop.component";
import {NotificationComponent} from "./pages/notification/notification.component";
import {WidgetLISAComponent} from "./components/widget/widget.component";
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
import {RegisterBoxComponent} from "./pages/login/register-box/register-box.component";
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
import {DashboardService} from "./services/dashboard.service";
import {AddDeviceModalComponent} from "./components/modals/add-device-modal/add-device-modal.component";
import {PluginService} from "./services/plugin.service";
import {FieldComponent} from "./components/forms/field.component";
import {LabelComponent} from "./components/widget/label/label.component";
import {SelectorComponent} from "./components/widget/selector/selector.component";
import {KeysPipe} from "./shared/keys-pipe";
import {ScenesFormComponent} from "./pages/scenes/form/scenes-form.component";
import {ScenesListComponent} from "./pages/scenes/list/scenes-list.component";
import {ChatbotService} from "app/services/chatbot.service";
import {SpeechInputComponent} from "./components/forms/speech-input.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    KeysPipe,
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
    VboxComponent,
    LabelComponent,
    SelectorComponent,
    HboxComponent,
    CardComponent,
    FieldComponent,
    ToggleButtonComponent,
    ButtonComponent,
    ImageComponent,
    ColorPickerComponent,
    ImageButtonComponent,
    CameraComponent,
    SliderComponent,
    LoginBoxComponent,
    RegisterBoxComponent,
    NotificationManagerComponent,
    FocusDirective,
    ConfirmModalComponent,
    WidgetHeaderComponent,
    WidgetContentComponent,
    SpaceComponent,
    ScenesFormComponent,
    SpeechInputComponent,
    ScenesListComponent,
    AddDeviceModalComponent
  ],
  entryComponents: [
    WidgetLISAComponent,
    VboxComponent,
    HboxComponent,
    CardComponent,
    SliderComponent,
    LabelComponent,
    SelectorComponent,
    ImageButtonComponent,
    ImageComponent,
    ButtonComponent,
    ColorPickerComponent,
    CameraComponent,
    SpaceComponent,
    ToggleButtonComponent
  ],
  imports: [
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ColorPickerModule,
    NgDashboardModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    DashboardService,
    AuthService,
    PluginService,
    ChatbotService,
    WebsocketService,
    NotificationService,
    BROWSER_WEBSOCKET_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
}

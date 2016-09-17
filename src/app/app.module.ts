import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfilComponent} from './pages/profil/profil.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {ScenesComponent} from './pages/scenes/scenes.component';
import {PluginsComponent} from './pages/plugins/plugins.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AlertModule, DatepickerModule} from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfilComponent,
    SettingsComponent,
    ScenesComponent,
    PluginsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    AlertModule,
    DatepickerModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

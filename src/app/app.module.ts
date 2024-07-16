import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserComponent } from './components/user/user.component';
import { UserModule } from './components/user/user.module';
import { appProviders } from './context/appProviders.context';

@NgModule({
  declarations: [AppComponent, SignInComponent, SignUpComponent, UserComponent],
  imports: [UserModule, BrowserModule, AppRoutingModule],
  providers: [provideClientHydration(), ...appProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

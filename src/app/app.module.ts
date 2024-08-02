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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/user/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { RelateToProductsComponent } from './components/user/cart/relate-to-products/relate-to-products.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    CartComponent,
    HeaderComponent,
    RelateToProductsComponent,
  ],
  imports: [
    UserModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration(), ...appProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from "@angular/common/http";

import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MaterialModule } from "./shared-modules/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from "./store/reducers/user.reducer";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forFeature([UserEffects]),
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot({user: UserReducer}),
    StoreModule.forFeature('user', UserReducer)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

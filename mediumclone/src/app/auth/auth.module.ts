import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { reducers } from './store/reducers';
import { AuthService } from './services/auth.service';
import { RegisterEffect } from './store/effects/register.effect';
import { BackEndErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { PersistanceService } from '../shared/services/persistance.service';
import { LoginEffect } from './store/effects/login.effect';
import { GetCurrentUserEffect } from './store/effects/getCurrentUser.effect';

const routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
    BackEndErrorMessagesModule
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistanceService]
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { RegesterPageComponent } from './components/regester-page/regester-page.component';
import { getRoutes } from './routes/account.route';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AccountSettingPageComponent } from './components/account-setting-page/account-setting-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { LoaderModule } from '../shared/modules/loader/loader.module';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffect } from './store/effects/account.effect';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegesterPageComponent,
    AccountSettingPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(getRoutes()),
    LayoutsModule,
    RouterModule ,
    BrowserAnimationsModule,
    ToastModule,
    LoaderModule,
    ButtonModule,
    InputTextModule,
    StoreModule.forFeature('account', reducers),
    EffectsModule.forFeature([AccountEffect]),
    DialogModule
  ],
  providers: [MessageService, AuthService],
})
export class AccountModule { }

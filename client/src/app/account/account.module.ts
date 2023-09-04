import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { RegesterPageComponent } from './components/regester-page/regester-page.component';
// import { AuthLayoutComponent } from '../shared/modules/layouts/components/auth-layout/auth-layout.component';
// import { Route } from '../shared/types/interfaces';
import { getRoutes } from './routes/account.route';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LoginPageComponent,
    RegesterPageComponent,
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
  ],
  providers: [MessageService],
})
export class AccountModule { }

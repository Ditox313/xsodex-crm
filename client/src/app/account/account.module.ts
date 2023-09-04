import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { AuthLayoutComponent } from '../shared/modules/layouts/components/auth-layout/auth-layout.component';
import { Route } from '../shared/types/interfaces';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegesterPageComponent } from './components/regester-page/regester-page.component';



const routes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '', 
        redirectTo: '/login-page',
        pathMatch: 'full',
      },
      {
        path: 'login-page',
        component: LoginPageComponent,
      },
      {
        path: 'register-page',
        component: RegesterPageComponent,
      },
 
    ],
  },
];


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
    RouterModule.forChild(routes),
    LayoutsModule,
    RouterModule ,
    BrowserAnimationsModule,
    ToastModule,
    ButtonModule,
  ],
  providers: [MessageService],
})
export class AccountModule { }

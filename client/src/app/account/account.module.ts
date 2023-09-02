import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { AuthLayoutComponent } from '../shared/modules/layouts/components/auth-layout/auth-layout.component';
import { Route } from '../shared/types/interfaces';

const routes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '', 
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
 
    ],
  },
];


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    LayoutsModule,
    RouterModule 
  ]
})
export class AccountModule { }

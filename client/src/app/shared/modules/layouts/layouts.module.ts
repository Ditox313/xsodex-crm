import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/account/services/auth.service';
import { LoaderModule } from '../loader/loader.module';
import { HeaderAppLayoutComponent } from './components/header-app-layout/header-app-layout.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    AppLayoutComponent,
    HeaderAppLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    LoaderModule,
  ],
  providers: [MessageService, AuthService],
  exports: [
    AuthLayoutComponent,
    AppLayoutComponent,
    HeaderAppLayoutComponent
  ]
})
export class LayoutsModule { }

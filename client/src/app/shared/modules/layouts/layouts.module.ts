import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/account/services/auth.service';
import { LoaderModule } from '../loader/loader.module';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    AppLayoutComponent
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
    AppLayoutComponent
  ]
})
export class LayoutsModule { }

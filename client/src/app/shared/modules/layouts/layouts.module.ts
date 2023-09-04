import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],
  exports: [
    AuthLayoutComponent,
    AppLayoutComponent
  ]
})
export class LayoutsModule { }

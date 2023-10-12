import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSmenaComponent } from './components/add-smena/add-smena.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { getRoutes } from './routes/smena.route';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderModule } from '../shared/modules/loader/loader.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ListSmenaComponent } from './components/list-smena/list-smena.component';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { SmenaService } from './services/smena.service';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SmenaEffect } from './store/effects/smena.effect';
import { ShowSmenaComponent } from './components/show-smena/show-smena.component';

@NgModule({
  declarations: [
    AddSmenaComponent,
    ListSmenaComponent,
    ShowSmenaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(getRoutes()),
    LayoutsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastModule,
    LoaderModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    StoreModule.forFeature('smena', reducers),
    EffectsModule.forFeature([SmenaEffect]),
  ],
  providers: [MessageService, DatePipe, SmenaService]
})
export class SmenaModule { }

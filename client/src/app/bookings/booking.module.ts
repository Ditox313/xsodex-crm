import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { LoaderModule } from '../shared/modules/loader/loader.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputMaskModule } from 'primeng/inputmask';
import { getRoutes } from './routes/bookings.route';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ListBookinhsComponent } from './components/list-bookinhs/list-bookinhs.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { BookingsService } from './services/bookings.service';
import { BookingsEffect } from './store/effects/bookings.effect';



@NgModule({
  declarations: [
    ListBookinhsComponent
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
    TabViewModule,
    TreeSelectModule,
    InputMaskModule,
    StoreModule.forFeature('bookings', reducers),
    EffectsModule.forFeature([BookingsEffect]),
  ],
  providers: [MessageService, DatePipe, BookingsService]
})
export class BookingsModule { }

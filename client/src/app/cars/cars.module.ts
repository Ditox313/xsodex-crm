import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCarsComponent } from './components/list-cars/list-cars.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getRoutes } from './routes/cars.route';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from '../shared/modules/layouts/layouts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { LoaderModule } from '../shared/modules/loader/loader.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CarsService } from './services/cars.service';
import { InputMaskModule } from 'primeng/inputmask';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CarsEffect } from './store/effects/cars.effect';
import { ShowCarComponent } from './components/show-car/show-car.component';



@NgModule({
  declarations: [
    ListCarsComponent,
    AddCarComponent,
    ShowCarComponent
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
    StoreModule.forFeature('cars', reducers),
    EffectsModule.forFeature([CarsEffect]),
  ],
  providers: [MessageService, DatePipe, CarsService]
})
export class CarsModule { }

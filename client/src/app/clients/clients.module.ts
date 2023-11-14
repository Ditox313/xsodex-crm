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
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AddClientFizComponent } from './components/clients-fiz/add-client-fiz/add-client-fiz.component';
import { getRoutesClientsFiz } from './routes/clients-fiz/clients-fiz.route';
import { ListClientsFizComponent } from './components/clients-fiz/list-clients-fiz/list-clients-fiz.component';

// import { getRoutes } from './routes/partners.route';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { reducers } from './store/reducers';
// import { PartnersEffect } from './store/effects/partners.effect';
// import { PartnersService } from './services/partners.service';




@NgModule({
  declarations: [

  
    AddClientFizComponent,
        ListClientsFizComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(getRoutesClientsFiz()),
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
    // StoreModule.forFeature('partners', reducers),
    // EffectsModule.forFeature([PartnersEffect]),
  ],
  providers: [MessageService, DatePipe]
})
export class ClientsModule { }

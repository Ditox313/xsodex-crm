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
import { getRoutesClientsFiz } from './routes/clientsFiz/clientsFiz.route';
import { StoreModule } from '@ngrx/store';
import { reducerFiz } from './store/reducers/clientsFiz/reducersClientsFiz';
import { EffectsModule } from '@ngrx/effects';
import { ClientsFizEffect } from './store/effects/effectsClientsFiz/clientsFiz.effect';
import { ClientsFizService } from './services/clientsFiz/clientsFiz.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AddClientFizComponent } from './components/clients-fiz/add-client-fiz/add-client-fiz.component';
import { ListClientsFizComponent } from './components/clients-fiz/list-clients-fiz/list-clients-fiz.component';
import { ShowClientFizComponent } from './components/clients-fiz/show-client-fiz/show-client-fiz.component';
import { ListDogovorsClientsFizComponent } from './components/clients-fiz/list-dogovors-clients-fiz/list-dogovors-clients-fiz.component';
import { AddDogovorClientFizComponent } from './components/clients-fiz/add-dogovor-client-fiz/add-dogovor-client-fiz.component';
import { ShowDogovorClientFizComponent } from './components/clients-fiz/show-dogovor-client-fiz/show-dogovor-client-fiz.component';
import { ListClientsLawComponent } from './components/clients-law/list-clients-law/list-clients-law.component';
import { getRoutesClientsLaw } from './routes/clientsLaw/clientsLaw.route';
import { AddClientLawComponent } from './components/clients-law/add-client-law/add-client-law.component';
import { reducerLaw } from './store/reducers/clientsLaw/reducersClientsLaw';
import { ClientsLawEffect } from './store/effects/effectsClientsLaw/clientsLaw.effect';
import { ClientsLawService } from './services/clientsLaw/clientsLaw.service';




@NgModule({
  declarations: [
    AddClientFizComponent,
    ListClientsFizComponent,
    ShowClientFizComponent,
    ListDogovorsClientsFizComponent,
    AddDogovorClientFizComponent,
    ShowDogovorClientFizComponent,
    ListClientsLawComponent,
    AddClientLawComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(getRoutesClientsFiz()),
    RouterModule.forChild(getRoutesClientsLaw()),
    LayoutsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastModule,
    LoaderModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ToggleButtonModule,
    TabViewModule,
    TreeSelectModule,
    InputMaskModule,
    StoreModule.forFeature('clientsFiz', reducerFiz),
    StoreModule.forFeature('clientsLaw', reducerLaw),
    EffectsModule.forFeature([ClientsFizEffect, ClientsLawEffect]),
  ],
  providers: [MessageService, DatePipe, ClientsFizService, ClientsLawService]
})
export class ClientsModule { }

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
import { getRoutes } from './routes/partners.route';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ListPartnersComponent } from './components/list-partners/list-partners.component';
import { AddPartnerComponent } from './components/add-partner/add-partner.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { PartnersEffect } from './store/effects/partners.effect';


@NgModule({
  declarations: [
    ListPartnersComponent,
    AddPartnerComponent
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
    PdfViewerModule,
    StoreModule.forFeature('partners', reducers),
    EffectsModule.forFeature([PartnersEffect]),
  ],
  providers: [MessageService, DatePipe]
})
export class PartnersModule { }

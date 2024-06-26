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
import { getRoutes } from './routes/personal.route';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { MastersPriemEffect } from './store/effects/masters-priem.effect';
import { UploadFileModule } from '../shared/modules/upload-file/upload-file.module';
import { ListMastersPriemComponent } from './components/masters-priem/list-masters-priem/list-masters-priem.component';
import { AddMasterPriemComponent } from './components/masters-priem/add-master-priem/add-master-priem.component';
import { MastersPriemService } from './services/masters-priem.service';
import { ShowMasterPriemComponent } from './components/masters-priem/show-master-priem/show-master-priem.component';



@NgModule({
  declarations: [
    ListMastersPriemComponent,
    AddMasterPriemComponent,
    ShowMasterPriemComponent,
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
    UploadFileModule,
    StoreModule.forFeature('masters-priem', reducers),
    EffectsModule.forFeature([MastersPriemEffect]),
  ],
  providers: [MessageService, DatePipe, MastersPriemService]
})
export class PersonalModule { }

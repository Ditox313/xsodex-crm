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
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ListSettingsComponent } from './components/list-settings/list-settings.component';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { getRoutes } from './routes/settings.route';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffect } from './store/effects/settings.effect';
import { AddSettingAvtoparkComponent } from './components/add-setting-avtopark/add-setting-avtopark.component';


@NgModule({
  declarations: [
    ListSettingsComponent,
    AddSettingAvtoparkComponent,
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
    ToggleButtonModule,
    TabViewModule,
    TreeSelectModule,
    InputMaskModule,
    StoreModule.forFeature('settings', reducers),
    EffectsModule.forFeature([SettingsEffect]),
  ],
  providers: [MessageService, DatePipe]
})
export class SettingsModule { }

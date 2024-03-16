import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { UploadFileService } from './services/uploadFile.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    ToastModule
  ],
  exports: [
    UploadFileComponent
  ],
  providers: [UploadFileService, ]
})
export class UploadFileModule { }

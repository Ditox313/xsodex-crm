import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadFileService } from '../../services/uploadFile.service';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  isActive!: boolean;
  uploadFiles: any = []
  filesSrc: any = []
  delete_file$!: Subscription



  @Input() initialFilesSrc?: any | undefined = [];
  @Input() filesSrcRes: any | undefined = [];
  @Input() postId?: string | undefined  = '' ;
  @Input() typePost?: string | undefined  = '';
  @Output() dataUpload: EventEmitter<{ isActive: boolean, uploadFiles: any[], filesSrc: any[] }> = new EventEmitter<{ isActive: boolean, uploadFiles: any[], filesSrc: any[] }>()



  constructor(
    private uploadFileService: UploadFileService,
    private messageService: MessageService, 
  ) {}




  ngOnDestroy(): void {
    if (this.delete_file$) {
      this.delete_file$.unsubscribe()
    }
  }
  


  // 
  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {

      const fileArray = Array.from(droppedFiles);

      this.uploadFiles = []
      
      fileArray.forEach((file: any, i) => {
        this.uploadFiles.push(file)
        

        const reader = new FileReader();
        
        reader.onload = () => {
          if (this.uploadFiles[i].type !== 'application/pdf') {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = reader.result;
          }
          else {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
          }
        };



        // Читаем нужный нам файл
        reader.readAsDataURL(file);

        this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
      });
    }
    this.isActive = false;
  }

  onDroppedFile(droppedFiles: any) {
    let formData = new FormData();
    for(let item of droppedFiles) {
      formData.append('userfiles', item);
    }

    this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
  }


  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {

      const fileArray = Array.from(event.target.files);
      this.uploadFiles = []

      fileArray.forEach((file: any, i) => {
        this.uploadFiles.push(file)
        

        const reader = new FileReader();
        
        reader.onload = () => {
          if (this.uploadFiles[i].type !== 'application/pdf') {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = reader.result;
          }
          else {
            // Переменная для хранения информации об изображении
            this.filesSrc[i] = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
          }
        };


        // Читаем нужный нам файл
        reader.readAsDataURL(file);
        
      });

      this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
      

    }
  }




  formatFileSize(size: number) {
    if (size < 1024) {
      return `${size} байт`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} КБ`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
    }
  }

  // Удаляем загруженные файлы
  onDeleteUploadInList(i: number)
  {
    this.uploadFiles.splice(i, 1);
    this.filesSrc.splice(i, 1);
  }

// Удаляем загруженные файлы которые уже на сервере
  onDeleteInitialFilesSrc(src: string)
  {
    let data: any = {
      postId: this.postId,
      typePost: this.typePost,
      src: src
    }
    

    

    this.delete_file$ = this.uploadFileService.delete_file(data).subscribe((res) => {

      this.messageService.add({ severity: 'success', summary: `Файл удален`, detail: 'Успешно!' });

      this.initialFilesSrc.forEach((item: any) => {
        if(item == src)
        {
          this.initialFilesSrc = this.initialFilesSrc.filter((item: any) => item != src)
        }
        
      })
      
    });

  }


  // Получаем название файла
  getFileName(fileUrl: string) {
    // Находим последний индекс слэша
    const lastSlashIndex = fileUrl.lastIndexOf('\\');

    // Если слэш присутствует, возвращаем строку после последнего слэша
    if (lastSlashIndex !== -1) {
      return fileUrl.substring(lastSlashIndex + 1);
    }

    // Если слэш отсутствует, возвращаем исходную строку
    return fileUrl;
  }

}

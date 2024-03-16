import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  isActive!: boolean;
  uploadFiles: any = []
  filesSrc: any = []
  @Output() dataUpload: EventEmitter<{ isActive: boolean, uploadFiles: any[], filesSrc: any[] }> = new EventEmitter<{ isActive: boolean, uploadFiles: any[], filesSrc: any[] }>()



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
      this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
      return `${size} байт`;
    } else if (size < 1024 * 1024) {
      this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
      return `${(size / 1024).toFixed(2)} КБ`;
    } else {
      this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
      return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
    }
  }


  onDeleteUploadInList(i: number)
  {
    this.uploadFiles.splice(i, 1);
    this.filesSrc.splice(i, 1);
    this.dataUpload.emit({isActive: this.isActive, uploadFiles: this.uploadFiles, filesSrc: this.filesSrc })
  }

}

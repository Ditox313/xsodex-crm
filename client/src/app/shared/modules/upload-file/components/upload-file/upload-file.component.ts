import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { UploadFileService } from '../../services/uploadFile.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnChanges, OnDestroy {
  isActive = false;
  uploadFiles: File[] = [];
  filesSrc: string[] = [];
  private delete_file$?: Subscription;

  @Input() initialFilesSrc: any[] | undefined = [];
  @Input() filesSrcRes: any[] | undefined = [];
  @Input() postId: string | undefined = '';
  @Input() typePost: string | undefined = '';

  @Output() dataUpload = new EventEmitter<{
    isActive: boolean;
    uploadFiles: File[];
    filesSrc: string[];
  }>();

  constructor(
    private uploadFileService: UploadFileService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Если сервер прислал новые URL уже загруженных файлов —
    // очищаем все "черновые" загрузки
    if ('initialFilesSrc' in changes && changes['initialFilesSrc'].currentValue) {
      const cur = changes['initialFilesSrc'].currentValue;
      this.initialFilesSrc = Array.isArray(cur) ? cur : [];
      // сброс "черновых" файлов и превью
      this.uploadFiles = [];
      this.filesSrc = [];
      // уведомляем родителя, что массив uploadFiles/ filesSrc чист
      this.emitData();
    }

    // При необходимости синхронизируем внешние превью
    if ('filesSrcRes' in changes && changes['filesSrcRes'].currentValue) {
      const cur = changes['filesSrcRes'].currentValue;
      this.filesSrc = Array.isArray(cur) ? cur : [];
    }
  }

  ngOnDestroy(): void {
    this.delete_file$?.unsubscribe();
  }

  private emitData(): void {
    this.dataUpload.emit({
      isActive: this.isActive,
      uploadFiles: this.uploadFiles,
      filesSrc: this.filesSrc
    });
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isActive = true;
    this.emitData();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isActive = false;
    this.emitData();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isActive = false;
    const files = event.dataTransfer?.files;
    if (files?.length) {
      Array.from(files).forEach(file => this.addFile(file));
    }
  }

  onSelectedFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      Array.from(input.files).forEach(file => this.addFile(file));
    }
  }

  private addFile(file: File): void {
    this.uploadFiles.push(file);
    const reader = new FileReader();
    reader.onload = e => {
      const res = (e.target as FileReader).result as string;
      this.filesSrc.push(
        file.type !== 'application/pdf'
          ? res
          : 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg'
      );
      this.emitData();
    };
    reader.readAsDataURL(file);
  }

  onDeleteUploadInList(index: number): void {
    this.uploadFiles.splice(index, 1);
    this.filesSrc.splice(index, 1);
    this.emitData();
  }

  onDeleteInitialFilesSrc(src: string): void {
    const data = { postId: this.postId, typePost: this.typePost, src };
    this.delete_file$ = this.uploadFileService
      .delete_file(data)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Файл удалён',
          detail: 'Успешно!'
        });
        this.initialFilesSrc =
          this.initialFilesSrc?.filter(item => item !== src) || [];
      });
  }

  formatFileSize(size: number): string {
    if (size < 1024) return `${size} байт`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} КБ`;
    return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
  }

  getFileName(fileUrl: string): string {
    const idx = Math.max(fileUrl.lastIndexOf('/'), fileUrl.lastIndexOf('\\'));
    return idx !== -1 ? fileUrl.substring(idx + 1) : fileUrl;
  }
}

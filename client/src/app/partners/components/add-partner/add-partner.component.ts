import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Partner } from '../../types/partners.interfaces';
import { DatePipe } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { addPartnerAction } from '../../store/actions/partners.action';
import { isLoadingSelector } from '../../store/selectors';
import { UploadResponse } from '..//../../shared/types/product-response';
import { PartnersService } from '../../services/partners.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  title: string = 'Добавить партнера'
  form!: FormGroup;
  uploadFile_1!: File
  uploadFile_2!: File
  file_1: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  file_2: string | ArrayBuffer | undefined | null = 'https://phonoteka.org/uploads/posts/2023-03/1680212136_phonoteka-org-p-dmitrii-razvarov-art-instagram-90.jpg';
  @ViewChild('upload_1') upload_1!: ElementRef;
  @ViewChild('upload_2') upload_2!: ElementRef;
  isLoadingSelector$!: Observable<boolean | null>


  upload: UploadResponse = new UploadResponse();
  isActive!: boolean;

  uploadFiles: any = []
  filesSrc: any = []


  constructor(public datePipe: DatePipe, private store: Store, private partnersService: PartnersService,) { }


  ngOnInit(): void {
    this.initForm()
    this.initValues()
  }

  initForm() {
    this.form = new FormGroup({
      fio: new FormControl('', [Validators.required]),
      passport_seria_number: new FormControl('', [Validators.required]),
      passport_date: new FormControl(''),
      passport_who_take: new FormControl('', [Validators.required]),
      code_podrazdeleniya: new FormControl('', [Validators.required]),
      passport_register: new FormControl('', [Validators.required]),
      phone_1: new FormControl('', [Validators.required]),
      phone_2: new FormControl('', [Validators.required]),
    });
  }


  initValues() {
    this.isLoadingSelector$ = this.store.pipe(select(isLoadingSelector))
  }




  // Обрабатываем загрузку картинок
  onFile1Upload(event: any) {
    const file = event.target.files['0'];
    this.uploadFile_1 = file;

    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      if (event.target.files['0'].type !== 'application/pdf') {
        // Переменная для хранения информации об изображении
        this.file_1 = reader.result;
      }
      else {
        // Переменная для хранения информации об изображении
        this.file_1 = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
      }
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  };
    


  onFile2Upload(event: any) {
    const file = event.target.files['0'];
    this.uploadFile_2 = file;

    const reader = new FileReader();
    // Метод вызовется тогда, когда загрузится вся картинка
    // Метод вызовется тогда, когда загрузится вся картинка
    reader.onload = () => {
      if (event.target.files['0'].type !== 'application/pdf') {
        // Переменная для хранения информации об изображении
        this.file_2 = reader.result;
      }
      else {
        // Переменная для хранения информации об изображении
        this.file_2 = 'https://i.etsystatic.com/7267864/r/il/5235cc/1979275153/il_1588xN.1979275153_71s3.jpg';
      }
    };
    // Читаем нужный нам файл
    reader.readAsDataURL(file);
  }


  // Обрабатываем кнопку загрузки тригиря клик по скрытому инпуту
  onFile1UploadClick() {
    this.upload_1.nativeElement.click();
  }
  onFile2UploadClick() {
    this.upload_2.nativeElement.click();
  }


  // Проверяем оканчивается ли строка на определенные символы.Внашем случае PDF
  isPDF(str: any, suffix: any) {
    return new RegExp(suffix + '$').test(str);
  };







  onSubmit() {

    let fio = this.form.value.fio.split(' ');
    let passport_seria_number = this.form.value.passport_seria_number.split('-');


    const partner: Partner = {
      name: fio[1],
      surname: fio[0],
      lastname: fio[2],
      passport_seria: passport_seria_number[0],
      passport_number: passport_seria_number[1],
      passport_date: this.form.value.passport_date,
      passport_who_take: this.form.value.passport_who_take,
      code_podrazdeleniya: this.form.value.code_podrazdeleniya,
      passport_register: this.form.value.passport_register,
      phone_1: this.form.value.phone_1,
      phone_2: this.form.value.phone_2,
    };

    
    // this.store.dispatch(addPartnerAction({ partner: partner, file_1: this.uploadFile_1, file_2: this.uploadFile_2, }))
    this.store.dispatch(addPartnerAction({ partner: partner, files: this.uploadFiles }))
  }












  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let droppedFiles = event.dataTransfer.files;
    if(droppedFiles.length > 0) {
      // this.onDroppedFile(droppedFiles)

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
      });
    }
    this.isActive = false;
  }

  onDroppedFile(droppedFiles: any) {
    let formData = new FormData();
    for(let item of droppedFiles) {
      formData.append('userfiles', item);
    }

    this.partnersService.fileUpload(formData).subscribe(
      result => {
        this.upload = result;
      }
    )
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

      // this.onDroppedFile(event.target.files);
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


  onDeleteUploadInList(i: number)
  {
    this.uploadFiles.splice(i, 1);
    this.filesSrc.splice(i, 1);
    
  }







  
}
